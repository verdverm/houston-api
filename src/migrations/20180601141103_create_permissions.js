const TABLE_NAME = "permissions";

export function up(knex) {
  return knex.schema.hasTable(TABLE_NAME).then(exists => {
    if (exists) {
      return;
    }

    return knex.schema.createTable(TABLE_NAME, function(table) {
      table.string("id").primary();
      table
        .string("scope")
        .notNullable()
        .index(); // Global, user
      table.string("label");
      table.string("category");
      table.timestamps();
    });
  });
}

export function down(knex) {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}
