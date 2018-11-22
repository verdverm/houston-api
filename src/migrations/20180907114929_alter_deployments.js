const TABLE_NAME = "deployments";

export function up(knex) {
  return knex.schema.alterTable(TABLE_NAME, function(table) {
    table.string("registry_password");
  });
}

export function down() {}
