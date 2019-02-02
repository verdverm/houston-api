import config from "config";
import { createLogger, format, transports } from "winston";
const { combine, colorize, timestamp, printf, splat } = format;

const baseFormatter = combine(
  format(info => {
    info.level = `${info.level.toUpperCase()}`;
    return info;
  })(),
  splat(),
  timestamp({
    format: "YYYY-MM-DDTHH:mm:ss"
  })
);

const printer = printf(
  info => `${info.timestamp} ${info.level} ${info.message}`
);

const isProd = process.env.NODE_ENV === "production";
const formatter = isProd
  ? combine(baseFormatter, printer)
  : combine(baseFormatter, colorize(), printer);

// Reuturn a default console logger
export default createLogger({
  level: config.get("logging.level"),
  format: formatter,
  transports: [
    new transports.Console({
      // Supress logs if running `jest --silent`.
      silent: process.argv.indexOf("--silent") >= 0
    })
  ]
});
