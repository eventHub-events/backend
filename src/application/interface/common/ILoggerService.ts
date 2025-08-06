export interface ILoggerService<TMeta = unknown> {
  info(message: string, meta?: TMeta): void;
  warn(message: string, meta?: TMeta): void;
  error(message: string, meta?: TMeta): void;
  debug(message: string, meta?: TMeta): void;
}
