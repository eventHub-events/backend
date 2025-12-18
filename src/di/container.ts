import { RedisCacheService } from '../infrastructure/services/otp/RedisCacheService';
import { OtpService } from '../infrastructure/services/otp/OtpService';
import { UserRepository } from '../infrastructure/repositories/UserRepository';
import { GenerateOtpUseCase } from '../application/useCases/user/auth/GenerateOtpUseCase';

import { VerifyOtpUseCase } from '../application/useCases/user/auth/VerifyOtpUseCase';

import { AuthController } from '../interfaceAdapter/controllers/user/AuthController';
import { BcryptHashService } from '../infrastructure/services/hashing/BcryptHashService';
import { HashService } from '../infrastructure/services/hashing/HashService';
import { NodeMailerEmailService } from '../infrastructure/services/nodeMailer/NodeMailerEmailService';
import { EmailService } from '../infrastructure/services/nodeMailer/EmailService';
import { ResendOtpUseCase } from '../application/useCases/user/auth/ResendOtp';
import { LoginUserUseCase } from '../application/useCases/user/auth/LoginUserUseCase';
import { TokenService } from '../infrastructure/services/JwT/TokenService';
import { JWTToken } from '../infrastructure/services/JwT/JWTToken';
import { AuthMiddlewareService } from '../interfaceAdapter/middleware/AuthMiddleWareService';
import { AuthenticationMiddleWare } from '../interfaceAdapter/middleware/AuthenticationMiddleware';
import { RefreshTokenUseCase } from '../application/useCases/user/auth/GenerateRefreshTokenUseCase';
import { LogoutUserUseCase } from '../application/useCases/user/auth/LogoutUserUseCase';
import { ForgetPasswordUseCase } from '../application/useCases/user/auth/ForgetPasswordUseCase';
import { WinstonLoggerService } from '../infrastructure/services/logger/loggerService';
import { VerifyResetPasswordOtpUseCase } from '../application/useCases/user/auth/ResetPasswordUseCase';

import { UserMapper } from '../application/mapper/user/UserMapper';
import { organizerBlankProfileCreationUseCase } from './organizer/container';
import { OrganizerProfileCreator } from '../application/useCases/organizer/profile/organizerProfileCreator';
import { PasswordController } from '../interfaceAdapter/controllers/user/PasswordController';
import { ChangePasswordUseCase } from '../application/useCases/user/auth/ChangePasswordUseCase';
import { tokenConfig } from './common/commonContainers';
import { UserProfileMapper } from '../application/mapper/user/UserProfileMapper';
import { UserProfileRepository } from '../infrastructure/repositories/user/profile/UserProfileRepository';
import { UserProfileUseCase } from '../application/useCases/user/profile/UserProfileUseCase';
import { UserProfileController } from '../interfaceAdapter/controllers/user/UserProfileController';
import { UserProfileCreator } from '../application/service/user/UserProfileCreator';
import { ErrorMapperService } from '../infrastructure/errors/userProfileErrorMapper';
import { UserEntityFactory } from '../infrastructure/factories/user/UserEntityFactory';
import { UserProfileEntityFactory } from '../infrastructure/factories/user/UserProfileEntityFactory';
import { RegisterUserUseCase } from '../application/useCases/user/auth/RegisterUserUseCase';

const cacheService = new RedisCacheService();
export const loggerService = new WinstonLoggerService();
const userMapper = new UserMapper();
const userEntityFactory = new UserEntityFactory();
export const userRepository = new UserRepository(
  loggerService,
  userEntityFactory
);
const nodeMailerEmailService = new NodeMailerEmailService();
const emailService = new EmailService(nodeMailerEmailService);

// user profile related dependency  injection
const userProfileMapper = new UserProfileMapper();
const userProfileEntityFactory = new UserProfileEntityFactory();
const userProfileRepository = new UserProfileRepository(
  userProfileEntityFactory
);
const userProfileUseCase = new UserProfileUseCase(
  userRepository,
  userProfileRepository,
  userProfileMapper
);
const errorMapperService = new ErrorMapperService();
export const userProfileController = new UserProfileController(
  userProfileUseCase,
  errorMapperService
);

// Hashing related dependency injection
const bcryptHashService = new BcryptHashService();
export const hashService = new HashService(bcryptHashService);
const otpService = new OtpService(cacheService, hashService);
const generateOtpUseCase = new GenerateOtpUseCase(otpService);
const registerUserUseCase = new RegisterUserUseCase(
  userRepository,
  generateOtpUseCase,
  emailService
);
const profileCreators = {
  organizer: new OrganizerProfileCreator(organizerBlankProfileCreationUseCase),
  user: new UserProfileCreator(userProfileRepository),
};
const verifyOtpUseCase = new VerifyOtpUseCase(
  userRepository,
  otpService,
  hashService,
  userMapper,
  profileCreators
);
const jwtToken = new JWTToken(tokenConfig);
const tokenService = new TokenService(jwtToken);
const refreshTokenUseCase = new RefreshTokenUseCase(tokenService);

const authMiddlewareService = new AuthMiddlewareService(tokenService);
export const authenticationMiddleWare = new AuthenticationMiddleWare(
  authMiddlewareService,
  refreshTokenUseCase
);

const resendOtpUseCase = new ResendOtpUseCase(
  generateOtpUseCase,
  nodeMailerEmailService
);
const loginUserUseCase = new LoginUserUseCase(
  tokenService,
  hashService,
  userRepository
);
const logoutUserUseCase = new LogoutUserUseCase();

const forgetPasswordUseCase = new ForgetPasswordUseCase(
  generateOtpUseCase,
  userRepository,
  loggerService,
  emailService,
  userMapper,
  cacheService
);
const verifyResetPasswordOtpUseCase = new VerifyResetPasswordOtpUseCase(
  otpService,
  hashService,
  tokenService,
  cacheService
);
// const changePasswordUseCase=new ChangePasswordUseCase(userRepository,tokenService,hashService,loggerService,userMapper);
const changePasswordUseCase = new ChangePasswordUseCase(
  userRepository,
  tokenService,
  hashService,
  loggerService,
  userMapper
);

export const passwordController = new PasswordController(
  forgetPasswordUseCase,
  verifyResetPasswordOtpUseCase,
  changePasswordUseCase
);

export const authController = new AuthController(
  registerUserUseCase,
  resendOtpUseCase,
  verifyOtpUseCase,
  loginUserUseCase,
  logoutUserUseCase
);
