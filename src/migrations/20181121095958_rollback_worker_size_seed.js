import { SYSTEM_SETTING_WORKER_SIZES } from "../constants";

const SYSTEM_SETTING_TABLE = "system_settings";

export async function up(knex) {
  return await knex(SYSTEM_SETTING_TABLE)
    .where("key", SYSTEM_SETTING_WORKER_SIZES)
    .del();
}

export function down() {}
