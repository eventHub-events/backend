import { BcryptHashService } from "../../infrastructure/services/hashing/BcryptHashService";
import { HashService } from "../../infrastructure/services/hashing/HashService";

const bcryptHashService = new BcryptHashService();
export const hashService = new HashService(bcryptHashService);