import {
  SYSTEM_SETTING_ASTRO_UNIT,
  SYSTEM_SETTING_CELERY_AU_MIN,
  SYSTEM_SETTING_MAX_EXTRA_AU
} from "../constants";

const SYSTEM_SETTING_TABLE = "system_settings";

const insertIfNotExists = async (knex, record) => {
  const setting = await knex.select().where("key", record.key);
  if (setting.length) {
    return;
  }
  return await knex.insert(record);
};

export function up(knex) {
  const settings = [
    {
      key: SYSTEM_SETTING_ASTRO_UNIT,
      value: JSON.stringify({
        // CPU and mem based on GCP n1-standard machine type.
        // Always use millicpu and Megabytes here. Downstream calculations depend on it.
        cpu: "100m",
        memory: "384Mi",
        // Conservatively based on a pod per astro unit needing at least one surge for restats
        pods: 1,
        // Conservatively based on a pod per astro unit, needing 5 connections.
        // Tune down if running out of file descriptors. This shouldn't typically happen.
        airflowConns: 5,
        // The goal is to limit the number of connections to the actual database to prevent
        // connection exceed errors.
        actualConns: 0.5
        // Price per AU (disabled by default).
        // price: 10,
      }),
      category: "system"
    },
    {
      key: SYSTEM_SETTING_CELERY_AU_MIN,
      value: 3,
      category: "system"
    },
    {
      key: SYSTEM_SETTING_MAX_EXTRA_AU,
      value: 400,
      category: "system"
    }
  ];

  const promises = [];

  for (let setting of settings) {
    setting.created_at = new Date().toISOString();
    if (!setting.hasOwnProperty("is_encrypted")) {
      setting.is_encrypted = false;
    }
    promises.push(insertIfNotExists(knex(SYSTEM_SETTING_TABLE), setting));
  }
  return Promise.all(promises);
}

export function down() {}
