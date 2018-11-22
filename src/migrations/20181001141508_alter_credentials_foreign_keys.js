const LOCAL_CREDENTIALS_TABLE = "local_credentials";
const OAUTH_CREDENTIALS_TABLE = "oauth_credentials";

export function up(knex) {
  const promises = [
    knex.schema.alterTable(LOCAL_CREDENTIALS_TABLE, function(table) {
      table
        .foreign("user_uuid")
        .references("uuid")
        .inTable("users")
        .onDelete("CASCADE");
    }),
    knex.schema.alterTable(OAUTH_CREDENTIALS_TABLE, function(table) {
      table
        .foreign("user_uuid")
        .references("uuid")
        .inTable("users")
        .onDelete("CASCADE");
    })
  ];

  return Promise.all(promises);
}

export function down() {}
