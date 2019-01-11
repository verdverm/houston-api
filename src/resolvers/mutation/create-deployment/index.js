import fragment from "./fragment";
import {
  generateReleaseName,
  generateNamespace,
  generateEnvironmentSecretName
} from "deployments/naming";
import { createDatabaseForDeployment } from "deployments/database";
import {
  envArrayToObject,
  propertiesObjectToArray,
  generateHelmValues
} from "deployments/config";
import validate from "deployments/validate";
import { addFragmentToInfo } from "graphql-binding";
import config from "config";
import crypto from "crypto";
import { DEPLOYMENT_ADMIN } from "constants";

/*
 * Create a deployment.
 * @param {Object} parent The result of the parent resolver.
 * @param {Object} args The graphql arguments.
 * @param {Object} ctx The graphql context.
 * @return {Deployment} The newly created Deployment.
 */
export default async function createDeployment(parent, args, ctx, info) {
  // Validate deployment args.
  await validate(args.workspaceUuid, args);

  // This API supports a type parameter, but we only support airflow now,
  // so we're just ignoring it for now.
  const type = "airflow";

  // Default deployment version to platform version.
  const version = args.version
    ? args.version
    : config.get("helm.releaseVersion");

  // Generate a unique registry password for this deployment.
  const registryPassword = crypto.randomBytes(16).toString("hex");

  // Generate a random space-themed release name.
  const releaseName = generateReleaseName();

  // Generate a list of properties to add to mutation.
  const properties = propertiesObjectToArray(args.properties);

  // Create the base mutation.
  const mutation = {
    data: {
      type,
      version,
      label: args.label,
      description: args.description,
      config: args.config,
      releaseName,
      registryPassword,
      properties: { create: properties },
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
  await ctx.db.mutation.createRoleBinding(
    {
      data: {
        role: DEPLOYMENT_ADMIN,
        user: { connect: { id: ctx.user.id } },
        deployment: { connect: { id: deployment.id } }
      }
    },
    `{ id }`
  );

  // Create the database for this deployment.
  const {
    metadataConnection,
    resultBackendConnection
  } = await createDatabaseForDeployment(deployment);

  // Create some ad-hoc values to get passed into helm.
  const values = { data: { metadataConnection, resultBackendConnection } };

  // Fire off createDeployment to commander.
  await ctx.commander.request("createDeployment", {
    releaseName: releaseName,
    chart: {
      name: type,
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
