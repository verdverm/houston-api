const TABLE_NAME = "workspace_properties";

export function up(knex) {
  return knex.schema.hasTable(TABLE_NAME).then(exists => {
    if (exists) {
      return;
    }

    return knex.schema.createTable(TABLE_NAME, function(table) {
      table
        .uuid("workspace_uuid")
        .references("uuid")
        .inTable("workspaces")
        .notNullable()
        .onDelete("CASCADE");
      table.string("key");
      table.string("value");
      table.string("category").index();
      table.timestamps();

      table.primary(["workspace_uuid", "key"]);
    });
  });
}

export function down(knex) {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}
