import log from "logger";

export function formatError(error) {
  log.error(error);
  return error;
}

export * from "./errors";
