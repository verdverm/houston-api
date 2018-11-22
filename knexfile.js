module.exports = {
  development: {
    client: "postgres",
    connection: {
      database: "postgres",
      user: "postgres",
      password: "postgres",
      port: "5432"
    },
    migrations: {
      directory: __dirname + "/src/migrations",
      tableName: "migrations"
    }
  },
  production: {
    client: "postgres",
    connection: process.env.HOUSTON_POSTGRES_URI,
    migrations: {
      directory: __dirname + "/src/migrations",
      tableName: "migrations"
    }
  }
};
