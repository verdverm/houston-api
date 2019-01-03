import { fromPairs } from "lodash";

/*
 * Transform an array of key/value pairs to an object.
 * @param {[]Object} An array of objects with key/value pairs.
 * @return {Object} The object with key/value pairs.
 */
export function transformEnvironmentVariables(arr) {
  return fromPairs(arr.map(i => [i.key, i.value]));
}
