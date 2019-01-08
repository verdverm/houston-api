import {
  generateReleaseName,
  generateNamespace,
  generateEnvironmentSecretName
} from "deployments/naming";
import { createDatabaseForDeployment } from "deployments/database";
import { envArrayToObject, generateHelmValues } from "deployments/config";
import { DuplicateDeploymentLabelError } from "errors";
import { addFragmentToInfo } from "graphql-binding";
import { pick, map, filter, startsWith } from "lodash";
import config from "config";
import crypto from "crypto";
import * as constants from "constants";

/*
 * Create a deployment.
 * @param {Object} parent The result of the parent resolver.
 * @param {Object} args The graphql arguments.
 * @param {Object} ctx The graphql context.
 * @return {Deployment} The newly created Deployment.
 */
export default async function createDeployment(parent, args, ctx, info) {
  // Check if this label exists for this workspace.
  // Houston 1 relied on a multi-column unique index, which prisma does not currently support.
  // This is the workaround for now. Issues for this are opened here:
  // https://github.com/prisma/prisma/issues/171
  // https://github.com/prisma/prisma/issues/1300
  const exists = await ctx.db.exists.Deployment({
    label: args.label,
    workspace: { id: args.workspaceUuid }
  });

  // Throw error if one already exists.
  if (exists) throw new DuplicateDeploymentLabelError(args.label);

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

  // Filter down whitelisted deployment properties.
  const allowedProps = filter(constants, (_, name) =>
    startsWith(name, "DEPLOYMENT_PROPERTY")
  );

  // Remove any invalid properties.
  const validProps = args.properties ? pick(args.properties, allowedProps) : {};

  // Generate a list of properties to add to mutation.
  const properties = map(validProps, (val, key) => ({
    key,
    value: val.toString()
  }));

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

  // Create a fragment to ensure that we always return the id, config, releaseName
  // and properties, no matter what a user requests.
  const fragment = `fragment EnsureFields on Deployment { id, config, releaseName, properties { key, value } }`;

  // Run the mutation.
  const deployment = await ctx.db.mutation.createDeployment(
    mutation,
    addFragmentToInfo(info, fragment)
  );

  // Create the role binding for the user.
  await ctx.db.mutation.createRoleBinding(
    {
      data: {
        role: constants.DEPLOYMENT_ADMIN,
        subject: { connect: { id: ctx.user.id } },
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
  // TODO: The createDeployment commander method currently allows you to pass
  // secrets to get created, but the implementation does not quite work.
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
