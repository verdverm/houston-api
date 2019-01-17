import { find, fromPairs, map, merge, partition, unionBy } from "lodash";

/*
 * Transform an object of key/value pairs to an array with key/value fields.
 * @param {Object} An array of objects with key/value pairs.
 * @return {[]Object} The object with key/value pairs.
 */
export function propertiesObjectToArray(obj = {}) {
  return map(obj, (val, key) => ({
    key,
    value: val.toString()
  }));
}

/*
 * Transform an array of key/value pairs to an object with key/value fields.
 * @param {Object} An array of objects with key/value pairs.
 * @return {[]Object} The object with key/value pairs.
 */
export function propertiesArrayToObject(arr = []) {
  return fromPairs(arr.map(i => [i.key, parseJSON(i.value)]));
}

/*
 * Attempt to parse a value as JSON, and either return
 * the parsed JSON object/array, or the primitive if fails.
 * @param {Whatever} thing Thing of any type.
 * @return {JSON/Whatever} Either the valid JSON if it parses
 * successfully, otherwise the originally passed in value.
 */
export function parseJSON(thing) {
  try {
    return JSON.parse(thing);
  } catch {
    return thing;
  }
}

/*
 * Merge existing and incoming deployment properties.
 * @param {[]Object} existing Array of { id, key, value }.
 * @param {[]Object} incoming Array of { key, value }.
 * @return {Object} An object containing an update and create objects to "upsert" deployment properties for a deployment update operation.
 */
export function combinePropsForUpdate(existingProps = [], incomingProps = []) {
  // Loop over existing, replacing values if they are incoming.
  const props = existingProps.map(existing => {
    const incoming = find(incomingProps, { key: existing.key });
    return incoming ? merge({}, existing, { value: incoming.value }) : existing;
  });

  const mergedProperties = unionBy(props, incomingProps, "key");
  const [updates, create] = partition(mergedProperties, "id");

  const update = updates.map(u => ({
    where: { id: u.id },
    data: { key: u.key, value: u.value }
  }));

  return { update, create };
}
