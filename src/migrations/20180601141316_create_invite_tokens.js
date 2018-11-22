const TABLE_NAME = "invite_tokens";

export function up(knex) {
  return knex.schema.hasTable(TABLE_NAME).then(exists => {
    if (exists) {
      return;
    }

    return knex.schema.createTable(TABLE_NAME, function(table) {
      table.uuid("uuid").primary();
      table.string("email").index();
      table.string("token").unique();
      table
        .uuid("workspace_uuid")
        .nullable()
        .references("uuid")
        .inTable("workspaces")
        .onDelete("CASCADE")
        .index();
      table.string("assignments"); // What access this token grants the user accepting it
      table.timestamps();
    });
  });
}

export function down(knex) {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}
