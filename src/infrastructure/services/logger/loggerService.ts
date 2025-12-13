import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file'; // <-- import this
import { ILoggerService } from '../../../application/interface/common/ILoggerService';
import dotenv from 'dotenv';

dotenv.config();

export class WinstonLoggerService<
  TMeta = unknown,
> implements ILoggerService<TMeta> {
  private logger;

  constructor() {
    const logFormat = format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    });

    this.logger = createLogger({
      level: process.env.LOG_LEVEL || 'info',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat
      ),
      transports: [
        // Console output
        new transports.Console(),

        // Daily rotated error log (keeps for 30 days)
        new transports.DailyRotateFile({
          filename: 'logs/error-%DATE%.log',
          level: 'error',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '30d', // <-- retention period
        }),

        // Daily rotated combined log (keeps for 14 days)
        new transports.DailyRotateFile({
          filename: 'logs/combined-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d', // <-- retention period
        }),
      ],
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
