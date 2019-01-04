import {
  generateReleaseName,
  generateNamespace,
  generateEnvironmentSecretName
} from "deployments/naming";
import {
  transformEnvironmentVariables,
  generateHelmValues
} from "deployments/config";
import { addFragmentToInfo } from "graphql-binding";
import { pick, map, filter, startsWith } from "lodash";
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
  console.log(args);

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
      type: args.type,
      version: args.version,
      label: args.label,
      description: args.description,
      config: args.config,
      releaseName,
      registryPassword,
      properties: { create: properties }
    }
  };

  // Create a fragment to ensure that we always return the id, config
  // and properties, no matter what a user requests.
  const fragment = `fragment EnsureFields on Deployment { id, config, properties { key, value } }`;

  // Run the mutation.
  const deployment = await ctx.db.mutation.createDeployment(
    mutation,
    addFragmentToInfo(info, fragment)
  );

  // If we have environment variables, send to commander.
  // args.env &&
  //   (await ctx.commander("setSecret", {
  //     release_name: releaseName,
  //     namespace: generateNamespace(releaseName),
  //     secret: {
  //       name: generateEnvironmentSecretName(releaseName),
  //       data: transformEnvironmentVariables(args.env)
  //     }
  //   }));

  // console.log(deployment);
  const helmValues = generateHelmValues(deployment);
  // Console.log(helmValues);

  // Generate and merge the helm config.

  // Send the config to commander.

  // Return the deployment.
  return deployment;
}
