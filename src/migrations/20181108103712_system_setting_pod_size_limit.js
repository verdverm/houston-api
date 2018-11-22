const Constants = require("../constants.js");
const SYSTEM_SETTING_TABLE = "system_settings";

exports.up = async function(knex, Promise) {
  // Grab that AU system setting value
  const au = await knex(SYSTEM_SETTING_TABLE)
    .select("value")
    .where("key", Constants.SYSTEM_SETTING_ASTRO_UNIT)
    .first();

  // These are the base values used to derive all values listed in here
  const cpuAU = parseInt(JSON.parse(au.value).cpu);
  const memAU = parseInt(JSON.parse(au.value).memory);

  // Default settings based on GCP n1-standard
  const settings = [
    {
      key: Constants.SYSTEM_SETTING_POD_SIZE_LIMIT,
      value: JSON.stringify({
        cpu: `${cpuAU * 40}m`,
        memory: `${memAU * 40}Mi`
      }),
      category: "deployment",
      created_at: new Date().toISOString()
    }
  ];

  // Insert limits.
  return knex(SYSTEM_SETTING_TABLE).insert(settings);
};

exports.down = async function(knex) {
  return await knex(SYSTEM_SETTING_TABLE)
    .where("key", Constants.SYSTEM_SETTING_POD_SIZE_LIMIT)
    .del();
};
