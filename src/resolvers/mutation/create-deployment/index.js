import fragment from "./fragment";
import {
  generateReleaseName,
  generateNamespace,
  generateEnvironmentSecretName
} from "deployments/naming";
import { createDatabaseForDeployment } from "deployments/database";
import {
  envArrayToObject,
  generateHelmValues,
  mapPropertiesToDeployment,
  generateDefaultDeploymentConfig
} from "deployments/config";
import validate from "deployments/validate";
import { DeploymentPaymentError, TrialError } from "errors";
import { addFragmentToInfo } from "graphql-binding";
import moment from "moment";
import config from "config";
import bcrypt from "bcryptjs";
import { get, size } from "lodash";
import crypto from "crypto";
import { DEPLOYMENT_AIRFLOW } from "constants";

/*
 * Create a deployment.
 * @param {Object} parent The result of the parent resolver.
 * @param {Object} args The graphql arguments.
 * @param {Object} ctx The graphql context.
 * @return {Deployment} The newly created Deployment.
 */
export default async function createDeployment(parent, args, ctx, info) {
  const {
    releaseVersion: platformReleaseVersion,
    releaseName: platformReleaseName
  } = config.get("helm");

  // Throw an error if stripe is enabled (Cloud only) and a stripeCustomerId does not exist in the Workspace table
  const workspace = await ctx.db.query.workspace(
    {
      where: { id: args.workspaceUuid }
    },
    `{ stripeCustomerId, trialEndsAt, deployments }`
  );
  const stripeEnabled = config.get("stripe.enabled");

  if (workspace.stripeCustomerId == null && stripeEnabled == true) {
    throw new DeploymentPaymentError();
  }

  if (
    moment(workspace.trialEndsAt).isAfter(
      moment() == false && size(workspace.deployments >= 1)
    )
  ) {
    throw new TrialError();
  }

  // Grab the default airflow version.
  const defaultAirflowVersion = config.get("deployments.defaultAirflowVersion");

  // Validate deployment args.
  await validate(args.workspaceUuid, args);

  // Default deployment version to platform version.
  const version = get(args, "version", platformReleaseVersion);
  const airflowVersion = get(args, "airflowVersion", defaultAirflowVersion);

  // Generate a unique registry password for this deployment.
  const registryPassword = crypto.randomBytes(16).toString("hex");
  const hashedRegistryPassword = await bcrypt.hash(registryPassword, 10);

  // Generate a unique elasticsearch password for this deployment
  const elasticsearchPassword = crypto.randomBytes(16).toString("hex");
  const hashedElasticsearchPassword = await bcrypt.hash(
    elasticsearchPassword,
    10
  );

  // Generate a random space-themed release name.
  const releaseName = generateReleaseName();

  // Create the base mutation.
  const mutation = {
    data: {
      label: args.label,
      description: args.description,
      config: args.config || generateDefaultDeploymentConfig(),
      version,
      airflowVersion,
      releaseName,
      registryPassword: hashedRegistryPassword,
      elasticsearchPassword: hashedElasticsearchPassword,
      ...mapPropertiesToDeployment(args.properties),
      workspace: {
        connect: {
          id: args.workspaceUuid
        }
      }
    }
  };

  // Run the mutation.
  const deployment = await ctx.db.mutation.createDeployment(
    mutation,
    addFragmentToInfo(info, fragment)
  );

  // Create the role binding for the user.
  // XXX: This was commented out temporarily while we are
  // synthetically generating DEPLOYMENT_* RoleBindings.
  // await ctx.db.mutation.createRoleBinding(
  //   {
  //     data: {
  //       role: DEPLOYMENT_ADMIN,
  //       user: { connect: { id: ctx.user.id } },
  //       deployment: { connect: { id: deployment.id } }
  //     }
  //   },
  //   `{ id }`
  // );

  // Create the database for this deployment.
  const {
    metadataConnection,
    resultBackendConnection
  } = await createDatabaseForDeployment(deployment);

  // Create some ad-hoc values to get passed into helm.
  // These won't be changing so just pass them in on create,
  // and subsequent helm upgrades will use the --reuse-values option.
  const data = { metadataConnection, resultBackendConnection };
  const registry = { connection: { pass: registryPassword } };
  const elasticsearch = { connection: { pass: elasticsearchPassword } };
  const platform = {
    release: platformReleaseName,
    workspace: args.workspaceUuid
  };
  const values = { data, registry, elasticsearch, platform, airflowVersion };

  // Fire off createDeployment to commander.
  await ctx.commander.request("createDeployment", {
    releaseName: releaseName,
    chart: {
      name: DEPLOYMENT_AIRFLOW,
      version: version
    },
    namespace: generateNamespace(releaseName),
    rawConfig: JSON.stringify(generateHelmValues(deployment, values))
  });

  // If we have environment variables, send to commander.
  // TODO: The createDeployment commander method currently
  // allows you to pass secrets to get created,
  // but the implementation does not quite work.
  // This call can be consolidated once that is fixed up in commander.
  if (args.env) {
    await ctx.commander.request("setSecret", {
      release_name: releaseName,
      namespace: generateNamespace(releaseName),
      secret: {
        name: generateEnvironmentSecretName(releaseName),
        data: envArrayToObject(args.env)
      }
    });
  }

  // Return the deployment.
  return deployment;
}
