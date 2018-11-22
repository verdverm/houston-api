const TABLE_NAME = "user_properties";

export function up(knex) {
  return knex.schema.hasTable(TABLE_NAME).then(exists => {
    if (exists) {
      return;
    }

    return knex.schema.createTable(TABLE_NAME, function(table) {
      table
        .uuid("user_uuid")
        .references("uuid")
        .inTable("users")
        .notNullable()
        .onDelete("CASCADE");
      table.string("key");
      table.string("value");
      table.string("category").index();
      table.timestamps();

      table.primary(["user_uuid", "key"]);
    });
  });
}

export function down(knex) {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}
