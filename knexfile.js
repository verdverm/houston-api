import config from "config";

// Grab database configuration.
const { connection, migrations } = config.get("database");

// Export the knex configuration.
// This needs to be old school export for knex.
module.exports = {
  client: "postgres",
  connection: {
    user: connection.user,
    password: connection.password,
    port: connection.port,
    database: connection.database
  },
  migrations: {
    directory: __dirname + "/src/migrations",
    tableName: migrations.tableName,
    schemaName: migrations.schemaName
  }
};
