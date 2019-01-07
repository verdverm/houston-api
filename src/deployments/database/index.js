import {
  generateDatabaseName,
  generateAirflowUsername,
  generateCeleryUsername
} from "deployments/naming";
import knex from "knex";
import { clone, merge } from "lodash";
import config from "config";
import passwordGenerator from "generate-password";
import url from "url";

/*
 * Create a new database for a given deployment
 * @param {Object} deployment The deployment this database is for.
 */
export async function createDatabaseForDeployment(deployment) {
  const cfg = config.get("deployments.connection");
  const rootConn = createConnection(cfg);

  // Replace dashes with underscores.
  const dbName = generateDatabaseName(deployment.releaseName);
  const airflowSchemaName = "airflow";
  const celerySchemaName = "celery";
  const airflowUserName = generateAirflowUsername(deployment.releaseName);
  const celeryUserName = generateCeleryUsername(deployment.releaseName);
  const airflowPassword = passwordGenerator.generate({
    length: 32,
    numbers: true
  });
  const celeryPassword = passwordGenerator.generate({
    length: 32,
    numbers: true
  });

  // Create the new deployment database.
  await createDatabase(rootConn, dbName);

  // Connect to the newly created database.
  const deploymentCfg = merge(clone(cfg), { database: dbName });
  const deploymentDb = createConnection(deploymentCfg);

  // Create schema for airflow metadata.
  await createSchema(
    deploymentDb,
    dbName,
    airflowSchemaName,
    airflowUserName,
    airflowPassword,
    cfg.user
  );

  // Create schema for celery result backend.
  await createSchema(
    deploymentDb,
    dbName,
    celerySchemaName,
    celeryUserName,
    celeryPassword,
    cfg.user
  );

  // Kill connection to the deployments db.
  deploymentDb.destroy();

  // Construct url for airflow db.
  const metadataConnection = `postgres://${airflowUserName}:${airflowPassword}@${
    cfg.host
  }:${cfg.port}/${dbName}`;

  // Construt url for celery db.
  const resultBackendConnection = `postgres://${celeryUserName}:${celeryPassword}@${
    cfg.host
  }:${cfg.port}/${dbName}`;

  // Return both urls.
  return { metadataConnection, resultBackendConnection };
}

/*
 * Create a new database connection.
 * @param {Object} config An object containing configuration
 * information for the database.
 */
export function createConnection(config) {
  return knex({ client: "postgres", connection: config });
}

/*
 * Create a new database for a deployment.
 * @param {Object} conn An existing database connection.
 * @param {String} name Name for the new database.
 */
export function createDatabase(conn, name) {
  return conn.raw(`CREATE DATABASE ${name}`);
}

/*
 * Create a schema with new user/role.
 * @param {Object} conn An existing database connection.
 * @param {String} database Name of the deployments database.
 * @param {String} schema Name of the schema to create.
 * @param {String} user The name of the user for this schema.
 * @param {String} password The password for the new user.
 * @param {String} creator The root user.
 */
export async function createSchema(
  conn,
  database,
  schema,
  user,
  password,
  creator
) {
  // Create a new limited access user, with random password.
  await conn.raw(
    `CREATE USER ${user} WITH LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE NOINHERIT NOREPLICATION CONNECTION LIMIT -1 ENCRYPTED PASSWORD '${password}';`
  );

  // Grant the privleges of the new user to our root user (the one running these commands).
  await conn.raw(`GRANT ${user} TO ${creator}`);

  // Create a new schema, granting the new user access.
  await conn.raw(`CREATE SCHEMA ${schema} AUTHORIZATION ${user}`);

  // Assign privleges to the new user.
  await conn.raw(
    `ALTER DEFAULT PRIVILEGES IN SCHEMA ${schema} GRANT ALL PRIVILEGES ON TABLES TO ${user};` +
      `ALTER DEFAULT PRIVILEGES IN SCHEMA ${schema} GRANT USAGE ON SEQUENCES TO ${user};` +
      `GRANT USAGE ON SCHEMA ${schema} TO ${user};` +
      `GRANT CREATE ON SCHEMA ${schema} TO ${user};` +
      `GRANT ALL PRIVILEGES ON SCHEMA ${schema} TO ${user};` +
      `GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA ${schema} TO ${user};` +
      `GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA ${schema} TO ${user};`
  );

  // Set the search path of the new user to include the new schema.
  await conn.raw(`ALTER ROLE ${user} SET search_path = ${schema};`);

  // Revoke the root users access from the new schema.
  await conn.raw(`REVOKE ${user} FROM ${creator}`);
}
