import config from "config";

/*
 * Ensure a boolean return value.
 * @param {String} path The config path.
 * @return {Boolean} Config value.
 */
export function getBoolean(path) {
  return config.has(path) ? JSON.parse(config.get(path)) : false;
}

/*
 * Ensure a boolean return value.
 * @param {String} path The config path.
 * @return {Boolean} Config value.
 */
export function getString(path) {
  return config.has(path) ? config.get(path) : "";
}

/*
 * Pass through to underlying config library.
 * @param {String} path The config path.
 * @return {Boolean} Config value.
 */
export function get(path) {
  return config.get(path);
}

/*
 * Pass through to underlying config library.
 * @param {String} path The config path.
 * @return {Boolean} Config value.
 */
export function has(path) {
  return config.has(path);
}

export default { getBoolean, getString, get };
