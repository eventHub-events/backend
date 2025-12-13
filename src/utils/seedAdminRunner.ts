import { DbConnection } from '../config/mongoose/DbConnection';
import { UserEntityFactory } from '../infrastructure/factories/user/UserEntityFactory';

import { UserRepository } from '../infrastructure/repositories/UserRepository';
import { BcryptHashService } from '../infrastructure/services/hashing/BcryptHashService';
import { WinstonLoggerService } from '../infrastructure/services/logger/loggerService';

import { SeedAdmin } from './SeedAdmin';
if (require.main === module) {
  (async () => {
    await DbConnection.connect();
    const loggerService = new WinstonLoggerService();

    const userEntityFactory = new UserEntityFactory();
    const userRepository = new UserRepository(loggerService, userEntityFactory);
    const logger = new WinstonLoggerService();
    const hashService = new BcryptHashService();

    await new SeedAdmin(userRepository, hashService, logger).execute();

    process.exit(0);
  })();
}
