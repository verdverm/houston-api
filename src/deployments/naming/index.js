import adjectives from "./adjectives";
import nouns from "./nouns";
import config from "config";
import Haikunator from "haikunator";

/*
 * Generate a release name using the adjectives and nouns in this package.
 * @param {Integer} tokenLength Amount of digits to append.
 * @return {String} The release name.
 */
export function generateReleaseName(tokenLength = 4) {
  const haikunator = new Haikunator({ adjectives, nouns });
  return haikunator.haikunate({ tokenLength }).replace(/_/g, "-");
}

/*
 * Generate a namespace from the given release name.
 * @param {String} releaseName A release name.
 * @return {String} The namespace name
 */
export function generateNamespace(releaseName) {
  const { releaseNamespace, singleNamespace } = config.get("helm");
  return singleNamespace
    ? releaseNamespace
    : `${releaseNamespace}-${releaseName}`;
}

/*
 * Generate the name for environment secret.
 * @param {String} releaseName A release name.
 * @return {String} The secret name.
 */
export function generateEnvironmentSecretName(releaseName) {
  return `${releaseName}-env`;
}
