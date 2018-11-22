import {
  SYSTEM_SETTING_ASTRO_UNIT,
  SYSTEM_SETTING_POD_SIZE_LIMIT
} from "../constants";

const SYSTEM_SETTING_TABLE = "system_settings";

export async function up(knex) {
  // Grab that AU system setting value
  const au = await knex(SYSTEM_SETTING_TABLE)
    .select("value")
    .where("key", SYSTEM_SETTING_ASTRO_UNIT)
    .first();

  // These are the base values used to derive all values listed in here
  const cpuAU = parseInt(JSON.parse(au.value).cpu);
  const memAU = parseInt(JSON.parse(au.value).memory);

  // Default settings based on GCP n1-standard
  const settings = [
    {
      key: SYSTEM_SETTING_POD_SIZE_LIMIT,
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
}

export async function down(knex) {
  return await knex(SYSTEM_SETTING_TABLE)
    .where("key", SYSTEM_SETTING_POD_SIZE_LIMIT)
    .del();
}
