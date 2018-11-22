const TABLE_NAME = "invite_tokens";

export function up(knex) {
  return knex.schema.alterTable(TABLE_NAME, function(table) {
    table
      .uuid("user_uuid")
      .nullable()
      .references("uuid")
      .inTable("users")
      .onDelete("CASCADE")
      .index();
  });
}

export function down() {}
