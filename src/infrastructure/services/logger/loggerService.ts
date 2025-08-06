import { createLogger, format, transports } from "winston";
import { ILoggerService } from"../../../application/interface/common/ILoggerService"
import dotenv from"dotenv"
dotenv.config()

export class WinstonLoggerService<TMeta = unknown> implements ILoggerService<TMeta> {
  private logger;

  constructor() {
    this.logger = createLogger({
      level: process.env.LOG_LEVEL || "info",
      format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.printf(({ level, message, timestamp }) => {
          return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
        })
      ),
      transports: [
        new transports.Console(),
        new transports.File({ filename: "logs/error.log", level: "error" }),
        new transports.File({ filename: "logs/combined.log" })
      ]
    });
  }

  info(message: string, meta?: TMeta) {
    this.logger.info(message, meta);
  }

  warn(message: string, meta?: TMeta) {
    this.logger.warn(message, meta);
  }

  error(message: string, meta?: TMeta) {
    this.logger.error(message, meta);
  }

  debug(message: string, meta?: TMeta) {
    this.logger.debug(message, meta);
  }
}
