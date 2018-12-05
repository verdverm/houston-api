const TABLE_NAME = "system_settings";

export function up(knex) {
  return knex.schema.alterTable(TABLE_NAME, function(table) {
    table.text("value").alter();
  });
}

export function down() {}
