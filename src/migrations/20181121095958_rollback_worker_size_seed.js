const Constants = require("../constants.js");
const SYSTEM_SETTING_TABLE = "system_settings";

exports.up = async function(knex, Promise) {
  return await knex(SYSTEM_SETTING_TABLE)
    .where("key", Constants.SYSTEM_SETTING_WORKER_SIZES)
    .del();
};

exports.down = function(knex, Promise) {};
