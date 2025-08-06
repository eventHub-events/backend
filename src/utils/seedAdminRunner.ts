import { DbConnection } from "../config/mongoose/DbConnection";
import { UserRepository } from "../infrastructure/repositories/UserRepository";
import { BcryptHashService } from "../infrastructure/services/hashing/BcryptHashService";
import { WinstonLoggerService } from "../infrastructure/services/logger/loggerService";



import { SeedAdmin } from "./SeedAdmin";
if (require.main === module) {
  (async () => {
    await DbConnection.connect();

    const userRepo = new UserRepository();
    const hashService = new BcryptHashService();
    const logger = new WinstonLoggerService();

    await new SeedAdmin(userRepo, hashService, logger).execute();

    process.exit(0);
  })();
}
