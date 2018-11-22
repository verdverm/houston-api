const TABLE_NAME = "deployment_properties";

export function up(knex) {
  return knex.schema.hasTable(TABLE_NAME).then(exists => {
    if (exists) {
      return;
    }

    return knex.schema.createTable(TABLE_NAME, function(table) {
      table
        .uuid("deployment_uuid")
        .references("uuid")
        .inTable("deployments")
        .notNullable()
        .onDelete("CASCADE");
      table.string("key");
      table.string("value");
      table.string("category").index();
      table.timestamps();

      table.primary(["deployment_uuid", "key"]);
    });
  });
}

export function down(knex) {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}
