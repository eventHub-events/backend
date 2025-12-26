import { RequestPasswordSetOTPUseCase } from "../../../application/useCases/common/password-reset/RequestPasswordSetOTPUseCase";
import { SetPasswordWithOtpUseCase } from "../../../application/useCases/common/password-reset/SetPasswordWithOtpUseCase";
import { UserEntityFactory } from "../../../infrastructure/factories/user/UserEntityFactory";
import { UserRepository } from "../../../infrastructure/repositories/UserRepository";
import { BcryptHashService } from "../../../infrastructure/services/hashing/BcryptHashService";
import { HashService } from "../../../infrastructure/services/hashing/HashService";
import { JWTToken } from "../../../infrastructure/services/JwT/JWTToken";
import { TokenService } from "../../../infrastructure/services/JwT/TokenService";
import { WinstonLoggerService } from "../../../infrastructure/services/logger/loggerService";
import { EmailService } from "../../../infrastructure/services/nodeMailer/EmailService";
import { NodeMailerEmailService } from "../../../infrastructure/services/nodeMailer/NodeMailerEmailService";
import { OtpService } from "../../../infrastructure/services/otp/OtpService";
import { RedisCacheService } from "../../../infrastructure/services/otp/RedisCacheService";
import { PasswordSetOtpEmailTemplate } from "../../../infrastructure/services/Templates/passwordSetOtpEmailTemplate";
import { tokenConfig } from "../commonContainers";

const userEntityFactory = new UserEntityFactory();
export const loggerService = new WinstonLoggerService();
export const userRepository = new UserRepository(
  loggerService,
  userEntityFactory
);
const cacheService = new RedisCacheService();
const nodeMailerEmailService = new NodeMailerEmailService();
const emailService = new EmailService(nodeMailerEmailService);

const bcryptHashService = new BcryptHashService();
export const hashService = new HashService(bcryptHashService);
const otpService = new OtpService(cacheService, hashService);
const jwtToken = new JWTToken(tokenConfig);
const tokenService = new TokenService(jwtToken);
const passwordSetOtpTemplate = new PasswordSetOtpEmailTemplate();
export const requestPasswordSetOTPUseCase = new RequestPasswordSetOTPUseCase(userRepository,tokenService,otpService,emailService,passwordSetOtpTemplate);
export const setPasswordWithOtpUseCase = new SetPasswordWithOtpUseCase(userRepository,otpService,tokenService,hashService);

