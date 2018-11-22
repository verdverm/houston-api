const TABLE_NAME = "service_accounts";

export function up(knex) {
  return knex.schema.alterTable(TABLE_NAME, function(table) {
    table.timestamp("last_used_at");
  });
}

export function down() {}
