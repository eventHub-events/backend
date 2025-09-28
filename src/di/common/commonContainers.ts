import { UserMapper } from "../../application/mapper/user/UserMapper";
import { UsersMapper } from "../../application/mapper/user/usersMapper";
import { ChangePasswordUseCase } from "../../application/user/auth/ChangePasswordUseCase";
import { ForgetPasswordUseCase } from "../../application/user/auth/ForgetPasswordUseCase";
import { GenerateOtpUseCase } from "../../application/user/auth/GenerateOtpUseCase";
import { RefreshTokenUseCase } from "../../application/user/auth/GenerateRefreshTokenUseCase";
import { VerifyResetPasswordOtpUseCase } from "../../application/user/auth/ResetPasswordUseCase";
import { TokenConfig } from "../../infrastructure/config/user/tokenConfig";
import { UserEntityFactory } from "../../infrastructure/factories/UserEntityFactory";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { BcryptHashService } from "../../infrastructure/services/hashing/BcryptHashService";
import { HashService } from "../../infrastructure/services/hashing/HashService";
import { JWTToken } from "../../infrastructure/services/JwT/JWTToken";
import { TokenService } from "../../infrastructure/services/JwT/TokenService";
import { WinstonLoggerService } from "../../infrastructure/services/logger/loggerService";
import { EmailService } from "../../infrastructure/services/nodeMailer/EmailService";
import { NodeMailerEmailService } from "../../infrastructure/services/nodeMailer/NodeMailerEmailService";
import { OtpService } from "../../infrastructure/services/otp/OtpService";
import { RedisCacheService } from "../../infrastructure/services/otp/RedisCacheService";
import { PasswordController } from "../../interface/controllers/user/PasswordController";
import { TokenController } from "../../interface/controllers/user/TokenController";

const cacheService = new RedisCacheService();
export const loggerService= new WinstonLoggerService()
const bcryptHashService = new BcryptHashService();
export const tokenConfig  = new TokenConfig()
const jwtToken = new JWTToken(tokenConfig)
const tokenService  = new TokenService(jwtToken);
const refreshTokenUseCase  = new RefreshTokenUseCase(tokenService);
export const tokenController   = new TokenController(refreshTokenUseCase)

export const hashService = new HashService(bcryptHashService);
const otpService = new OtpService(cacheService,hashService);
const nodeMailerEmailService = new NodeMailerEmailService();
const emailService = new EmailService(nodeMailerEmailService);
const generateOtpUseCase = new GenerateOtpUseCase(otpService);
const userMapper = new UserMapper();
const usersMapper= new UsersMapper(userMapper)
const userEntityFactory = new UserEntityFactory()
export const userRepository = new UserRepository(loggerService,userMapper,usersMapper,userEntityFactory);

const forgetPasswordUseCase = new ForgetPasswordUseCase(generateOtpUseCase,userRepository,loggerService,emailService,cacheService);
const verifyResetPasswordOtpUseCase =new VerifyResetPasswordOtpUseCase(otpService,hashService,tokenService,cacheService);;
const changePasswordUseCase =  new ChangePasswordUseCase(userRepository,tokenService,hashService,loggerService,userMapper)

export const passwordController  = new PasswordController(forgetPasswordUseCase,verifyResetPasswordOtpUseCase,changePasswordUseCase)
