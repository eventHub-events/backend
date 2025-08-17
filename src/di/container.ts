
import { RedisCacheService } from '../infrastructure/services/otp/RedisCacheService';
import { OtpService } from '../infrastructure/services/otp/OtpService';
import { UserRepository } from '../infrastructure/repositories/UserRepository';
import { GenerateOtpUseCase } from '../application/user/auth/GenerateOtpUseCase';
import { RegisterUserUseCase } from '../application/user/auth/RegisterUserUsecase';
import { VerifyOtpUseCase } from '../application/user/auth/VerifyOtpUseCase';

import { AuthController } from '../interface/controllers/user/AuthController';
import { BcryptHashService } from '../infrastructure/services/hashing/BcryptHashService';
import { HashService } from '../infrastructure/services/hashing/HashService';
import { NodeMailerEmailService } from '../infrastructure/services/nodeMailer/NodeMailerEmailService';
import { EmailService } from '../infrastructure/services/nodeMailer/EmailService';
import { ResendOtpUseCase } from '../application/user/auth/ResendOtp';
import { LoginUserUseCase } from '../application/user/auth/LoginUserUseCase';
import { TokenService } from '../infrastructure/services/JwT/TokenService';
import { JWTToken } from '../infrastructure/services/JwT/JWTToken';
import { AuthMiddlewareService } from "../interface/middleware/AuthMiddleWareService";
import { AuthenticationMiddleWare } from "../interface/middleware/AuthenticationMiddleware";
import { RefreshTokenUseCase } from '../application/user/auth/GenerateRefreshTokenUseCase';
import { LogoutUserUseCase } from '../application/user/auth/LogoutUserUseCase';
import { ForgetPasswordUseCase } from '../application/user/auth/ForgetPasswordUseCase';
import { WinstonLoggerService } from '../infrastructure/services/logger/loggerService';
import { VerifyResetPasswordOtpUseCase } from '../application/user/auth/ResetPasswordUseCase';
import { ChangePasswordUseCase } from '../application/user/auth/ChangePasswordUseCase';



const cacheService = new RedisCacheService();
const loggerService= new WinstonLoggerService()
export const userRepository = new UserRepository(loggerService);
const nodeMailerEmailService = new NodeMailerEmailService();
const emailService = new EmailService(nodeMailerEmailService);

// Hashing related dependency injection
const bcryptHashService = new BcryptHashService();
const hashService = new HashService(bcryptHashService);
const otpService = new OtpService(cacheService,hashService);
const generateOtpUseCase = new GenerateOtpUseCase(otpService);
const registerUserUseCase = new RegisterUserUseCase(userRepository, generateOtpUseCase, emailService);
const verifyOtpUseCase = new VerifyOtpUseCase(userRepository, otpService, hashService);
const jwtToken = new JWTToken()
const tokenService  = new TokenService(jwtToken)
const refreshTokenUseCase = new RefreshTokenUseCase(tokenService)


const authMiddlewareService= new AuthMiddlewareService(tokenService)
export const authenticationMiddleWare = new AuthenticationMiddleWare(authMiddlewareService)

const resendOtpUseCase = new ResendOtpUseCase(generateOtpUseCase, nodeMailerEmailService);
const loginUserUseCase   = new LoginUserUseCase(tokenService,hashService,userRepository)
const logoutUserUseCase= new LogoutUserUseCase()

const forgetPasswordUseCase = new ForgetPasswordUseCase(generateOtpUseCase,userRepository,loggerService,emailService,cacheService)
const verifyResetPasswordOtpUseCase =new VerifyResetPasswordOtpUseCase(otpService,hashService,tokenService,cacheService)
const changePasswordUseCase=new ChangePasswordUseCase(userRepository,tokenService,hashService,loggerService)

export const authController = new AuthController(registerUserUseCase, resendOtpUseCase, verifyOtpUseCase,loginUserUseCase,refreshTokenUseCase,logoutUserUseCase,forgetPasswordUseCase,verifyResetPasswordOtpUseCase,changePasswordUseCase );
