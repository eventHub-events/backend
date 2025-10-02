
import { RedisCacheService } from '../infrastructure/services/otp/RedisCacheService';
import { OtpService } from '../infrastructure/services/otp/OtpService';
import { UserRepository } from '../infrastructure/repositories/UserRepository';
import { GenerateOtpUseCase } from '../application/usecases/user/auth/GenerateOtpUseCase';
import { RegisterUserUseCase } from '../application/usecases/user/auth/RegisterUserUsecase';
import { VerifyOtpUseCase } from '../application/usecases/user/auth/VerifyOtpUseCase';

import { AuthController } from '../interfaceAdapter/controllers/user/AuthController';
import { BcryptHashService } from '../infrastructure/services/hashing/BcryptHashService';
import { HashService } from '../infrastructure/services/hashing/HashService';
import { NodeMailerEmailService } from '../infrastructure/services/nodeMailer/NodeMailerEmailService';
import { EmailService } from '../infrastructure/services/nodeMailer/EmailService';
import { ResendOtpUseCase } from '../application/usecases/user/auth/ResendOtp';
import { LoginUserUseCase } from '../application/usecases/user/auth/LoginUserUseCase';
import { TokenService } from '../infrastructure/services/JwT/TokenService';
import { JWTToken } from '../infrastructure/services/JwT/JWTToken';
import { AuthMiddlewareService } from "../interfaceAdapter/middleware/AuthMiddleWareService";
import { AuthenticationMiddleWare } from "../interfaceAdapter/middleware/AuthenticationMiddleware";
import { RefreshTokenUseCase } from '../application/usecases/user/auth/GenerateRefreshTokenUseCase';
import { LogoutUserUseCase } from '../application/usecases/user/auth/LogoutUserUseCase';
import { ForgetPasswordUseCase } from '../application/usecases/user/auth/ForgetPasswordUseCase';
import { WinstonLoggerService } from '../infrastructure/services/logger/loggerService';
import { VerifyResetPasswordOtpUseCase } from '../application/usecases/user/auth/ResetPasswordUseCase';

import { UserMapper } from '../application/mapper/user/UserMapper';
import { UsersMapper } from '../application/mapper/user/usersMapper';
import { organizerBlankProfileCreationUseCase } from './organizer/container';
import { OrganizerProfileCreator } from '../application/usecases/organizer/profile/organizerProfileCreator';
import { UserEntityFactory } from '../infrastructure/factories/UserEntityFactory';
import { PasswordController } from '../interfaceAdapter/controllers/user/PasswordController';
import { ChangePasswordUseCase } from '../application/usecases/user/auth/ChangePasswordUseCase';
import { tokenConfig } from './common/commonContainers';



const cacheService = new RedisCacheService();
export const loggerService= new WinstonLoggerService()
const userMapper = new UserMapper();
const usersMapper= new UsersMapper(userMapper)
const userEntityFactory = new UserEntityFactory()
export const userRepository = new UserRepository(loggerService,userMapper,usersMapper,userEntityFactory);
const nodeMailerEmailService = new NodeMailerEmailService();
const emailService = new EmailService(nodeMailerEmailService);

// Hashing related dependency injection
const bcryptHashService = new BcryptHashService();
export const hashService = new HashService(bcryptHashService);
const otpService = new OtpService(cacheService,hashService);
const generateOtpUseCase = new GenerateOtpUseCase(otpService);
const registerUserUseCase = new RegisterUserUseCase(userRepository, generateOtpUseCase, emailService);
const profileCreators = {
    organizer : new OrganizerProfileCreator(organizerBlankProfileCreationUseCase)
}
const verifyOtpUseCase = new VerifyOtpUseCase(userRepository, otpService, hashService,userMapper,profileCreators);
const jwtToken = new JWTToken(tokenConfig)
const tokenService  = new TokenService(jwtToken)
const refreshTokenUseCase = new RefreshTokenUseCase(tokenService)


const authMiddlewareService= new AuthMiddlewareService(tokenService)
export const authenticationMiddleWare = new AuthenticationMiddleWare(authMiddlewareService,refreshTokenUseCase)

const resendOtpUseCase = new ResendOtpUseCase(generateOtpUseCase, nodeMailerEmailService);
const loginUserUseCase   = new LoginUserUseCase(tokenService,hashService,userRepository)
const logoutUserUseCase= new LogoutUserUseCase()

const forgetPasswordUseCase = new ForgetPasswordUseCase(generateOtpUseCase,userRepository,loggerService,emailService,cacheService);
const verifyResetPasswordOtpUseCase =new VerifyResetPasswordOtpUseCase(otpService,hashService,tokenService,cacheService);
// const changePasswordUseCase=new ChangePasswordUseCase(userRepository,tokenService,hashService,loggerService,userMapper);
const changePasswordUseCase =  new ChangePasswordUseCase(userRepository,tokenService,hashService,loggerService,userMapper)

export const passwordController  = new PasswordController(forgetPasswordUseCase,verifyResetPasswordOtpUseCase,changePasswordUseCase)

// export const authController = new AuthController(registerUserUseCase, resendOtpUseCase, verifyOtpUseCase,loginUserUseCase,refreshTokenUseCase,logoutUserUseCase, );
export const authController = new AuthController(registerUserUseCase, resendOtpUseCase, verifyOtpUseCase,loginUserUseCase,logoutUserUseCase, );
