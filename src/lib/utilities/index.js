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
