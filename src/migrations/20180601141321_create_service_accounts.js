const TABLE_NAME = "service_accounts";

export function up(knex) {
  return knex.schema.hasTable(TABLE_NAME).then(exists => {
    if (exists) {
      return;
    }

    return knex.schema.createTable(TABLE_NAME, function(table) {
      table.uuid("uuid").primary();
      table.string("api_key").index();
      table.string("label");
      table.string("category");
      table.string("entity_type");
      table.uuid("entity_uuid");
      table.boolean("active");
      table.timestamps();

      table.index(["entity_type", "entity_uuid"]);
    });
  });
}

export function down(knex) {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}
