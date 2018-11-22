const TABLE_NAME = "session_refresh_tokens";

export function up(knex) {
  return knex.schema.hasTable(TABLE_NAME).then(exists => {
    if (exists) {
      return;
    }

    return knex.schema.createTable(TABLE_NAME, function(table) {
      table.uuid("uuid").primary();
      table.string("refresh_token").unique();
      table
        .uuid("user_uuid")
        .references("uuid")
        .inTable("users")
        .notNullable()
        .onDelete("CASCADE")
        .index();
      table.string("source");
      table.string("metadata"); // For storing info like user-agent, versions, etc
      table.boolean("active");
      table.timestamp("expires_at").nullable();
      table.timestamp("refreshed_at");
      table.timestamps();
    });
  });
}

export function down(knex) {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}
