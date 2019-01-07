import config from "config";

// Grab database configuration.
const dbConfig = config.get("database");

// Export the knex configuration.
// This needs to be old school export for knex.
module.exports = {
  client: "postgres",
  connection: {
    user: dbConfig.user,
    password: dbConfig.password,
    port: dbConfig.port,
    database: dbConfig.database
  },
  migrations: {
    directory: __dirname + "/src/migrations",
    tableName: "migrations"
  }
};
