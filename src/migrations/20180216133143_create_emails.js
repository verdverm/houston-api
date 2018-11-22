const TABLE_NAME = "emails";

export function up(knex) {
  return knex.schema.hasTable(TABLE_NAME).then(exists => {
    if (exists) {
      return;
    }

    return knex.schema.createTable(TABLE_NAME, function(table) {
      table.uuid("uuid").primary();
      table.string("address").unique();
      table
        .uuid("user_uuid")
        .references("uuid")
        .inTable("users")
        .notNullable()
        .onDelete("CASCADE")
        .index();
      table.string("token").unique();
      table.boolean("main"); // Primary, but "primary" is reserved
      table.boolean("verified");
      table.timestamps();

      table.index(["address", "user_uuid"]);
    });
  });
}

export function down(knex) {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}
