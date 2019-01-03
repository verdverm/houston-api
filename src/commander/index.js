import protoPath from "commander-proto";
import log from "logger";
import grpc from "grpc";
import caller from "grpc-caller";
import config from "config";

// Get the commander settings.
const { enabled, host, port } = config.get("commander");

// Concat host and port.
const authority = `${host}:${port}`;

// Path to the Commander service definition.
const path = `${protoPath}/commander.proto`;

// Service name.
const service = "Commander";

// Credentials for Commander.
const credentials = grpc.credentials.createInsecure();

// Export the wrapped grpc client.
const client = caller(authority, path, service, credentials);

export default async function(...args) {
  if (enabled) {
    log.info(`Calling commander method #${args[0]}`);
    const req = new client.Request(...args);
    const res = await req.exec();
    return res.response;
  }
  log.info(`Commander disabled, skipping call to #${args[0]}`);
}
