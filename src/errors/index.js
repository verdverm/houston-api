import log from "logger";

export function formatError(error) {
  log.error(error.message);
  return error;
}

export * from "./errors";
