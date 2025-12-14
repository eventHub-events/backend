import { EventMapper } from '../../application/mapper/organizer/EventMapper';
import { OrganizerSubscriptionMapper } from '../../application/mapper/organizer/OrganizerSubscriptionMapper';
import { BookingMapper } from '../../application/mapper/user/BookingMapper';
import { UserMapper } from '../../application/mapper/user/UserMapper';
import { GenerateSignedDownloadUrlUseCase } from '../../application/useCases/common/cloudinary/GenerateSignedDownloadUrlUseCase';
import { GetKycUploadSignatureUseCase } from '../../application/useCases/common/cloudinary/GetKycUploadSignatureUseCase';
import { GetUploadSignatureUseCase } from '../../application/useCases/common/cloudinary/GetUploadSignatureUseCase';
import { HandleEventCancelledRefundUseCase } from '../../application/useCases/common/event-cancel/handleEventCancelledRefundUseCase';
import { GoogleAuthUseCase } from '../../application/useCases/common/useCases/GoogleAuthUseCase';
import { HandleStripeWebhookUseCase } from '../../application/useCases/common/useCases/HandleStripeWebhookUseCase';
import { UpdateEventUseCase } from '../../application/useCases/organizer/events/editEventUseCase';
import { OrganizerBlankProfileCreationUseCase } from '../../application/useCases/organizer/profile/organizerBlankProfileCreationUseCase';
import { ActivateSubScriptionUseCase } from '../../application/useCases/organizer/subscription/ActivateSubscriptionUseCase';
import { UpgradeSubscriptionUseCase } from '../../application/useCases/organizer/subscription/upgradeSubscriptionUseCase';
import { ChangePasswordUseCase } from '../../application/useCases/user/auth/ChangePasswordUseCase';
import { ForgetPasswordUseCase } from '../../application/useCases/user/auth/ForgetPasswordUseCase';
import { GenerateOtpUseCase } from '../../application/useCases/user/auth/GenerateOtpUseCase';
import { RefreshTokenUseCase } from '../../application/useCases/user/auth/GenerateRefreshTokenUseCase';
import { VerifyResetPasswordOtpUseCase } from '../../application/useCases/user/auth/ResetPasswordUseCase';
import { ConfirmBookingUseCase } from '../../application/useCases/user/booking/ConfirmBookingUseCase';
import { UserBlankProfileCreationUseCase } from '../../application/useCases/user/profile/UserBlankProfileCreationUseCase';
import { GenerateTicketUseCase } from '../../application/useCases/user/ticketing/GenerateTicketUseCase';
import { TokenConfig } from '../../infrastructure/config/user/tokenConfig';
import { EventEntityFactory } from '../../infrastructure/factories/organizer/EventEntityFactory';
import { OrganizerProfileEntityFactory } from '../../infrastructure/factories/organizer/OrganizerProfileEntityFactory';
import { OrganizerSubscriptionEntityFactory } from '../../infrastructure/factories/organizer/OrganizerSubscriptionEntityFactory';
import { BookingEntityFactory } from '../../infrastructure/factories/user/BookingEntityFactory';
import { UserEntityFactory } from '../../infrastructure/factories/user/UserEntityFactory';
import { UserProfileEntityFactory } from '../../infrastructure/factories/user/UserProfileEntityFactory';
import { CheckBlockedMiddleware } from '../../infrastructure/middleware/BlockedCheck/CheckBlockedMiddlware';
import { EventRepository } from '../../infrastructure/repositories/organizer/EventsRepository';
import { OrganizerProfileRepository } from '../../infrastructure/repositories/organizer/OrganizerProfileRepository';
import { OrganizerSubscriptionRepository } from '../../infrastructure/repositories/organizer/OrganizerSubscriptionRepository';
import { BookingRepository } from '../../infrastructure/repositories/user/booking/BookingRepository';
import { UserProfileRepository } from '../../infrastructure/repositories/user/profile/UserProfileRepository';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { CloudinaryService } from '../../infrastructure/services/cloudinary/cloudinaryService';
import { OrganizerDocumentsCloudinaryService } from '../../infrastructure/services/cloudinary/OrganizerDocumentsCloudinaryService';
import { GoogleAuthService } from '../../infrastructure/services/googleAuthService/Auth';
import { BcryptHashService } from '../../infrastructure/services/hashing/BcryptHashService';
import { HashService } from '../../infrastructure/services/hashing/HashService';
import { JWTToken } from '../../infrastructure/services/JwT/JWTToken';
import { TokenService } from '../../infrastructure/services/JwT/TokenService';
import { WinstonLoggerService } from '../../infrastructure/services/logger/loggerService';
import { EmailService } from '../../infrastructure/services/nodeMailer/EmailService';
import { NodeMailerEmailService } from '../../infrastructure/services/nodeMailer/NodeMailerEmailService';
import { OtpService } from '../../infrastructure/services/otp/OtpService';
import { RedisCacheService } from '../../infrastructure/services/otp/RedisCacheService';
import { CloudinaryStorageService } from '../../infrastructure/services/storageService/CloudinaryStorageService';
import { StripeWebhookService } from '../../infrastructure/services/StripeWebhookService/StripeWebHookService';
import { RefundConfirmationEmailTemplate } from '../../infrastructure/services/Templates/refundConfirmationEmailTemplate';
import { CloudinaryController } from '../../interfaceAdapter/controllers/common/CloudinaryController';
import { GoogleAuthController } from '../../interfaceAdapter/controllers/common/GoogleAuthController';
import { StripeWebhookController } from '../../interfaceAdapter/controllers/common/StripWebhookController';
import { PasswordController } from '../../interfaceAdapter/controllers/user/PasswordController';
import { TokenController } from '../../interfaceAdapter/controllers/user/TokenController';
import dotenv from 'dotenv';
dotenv.config();

const cacheService = new RedisCacheService();
export const loggerService = new WinstonLoggerService();
const bcryptHashService = new BcryptHashService();
export const tokenConfig = new TokenConfig();
const jwtToken = new JWTToken(tokenConfig);
const tokenService = new TokenService(jwtToken);
const refreshTokenUseCase = new RefreshTokenUseCase(tokenService);
export const tokenController = new TokenController(refreshTokenUseCase);

export const hashService = new HashService(bcryptHashService);
const otpService = new OtpService(cacheService, hashService);
export const nodeMailerEmailService = new NodeMailerEmailService();
export const emailService = new EmailService(nodeMailerEmailService);
const generateOtpUseCase = new GenerateOtpUseCase(otpService);
const userMapper = new UserMapper();

const userEntityFactory = new UserEntityFactory();
export const userRepository = new UserRepository(
  loggerService,
  userEntityFactory
);

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

const eventEntityFactory = new EventEntityFactory();
export const eventRepository = new EventRepository(eventEntityFactory);
const eventMapper = new EventMapper();
export const updatingEventUseCase = new UpdateEventUseCase(
  eventRepository,
  eventMapper
);

// google- login //
const organizerProfileEntityFactory = new OrganizerProfileEntityFactory();
export const organizerProfileRepository = new OrganizerProfileRepository(
  loggerService,
  organizerProfileEntityFactory
);

const organizerBlankProfileCreationUseCase =
  new OrganizerBlankProfileCreationUseCase(organizerProfileRepository);
const userProfileEntityFactory = new UserProfileEntityFactory();

const userProfileRepository = new UserProfileRepository(
  userProfileEntityFactory
);
const userBlankProfileCreationUseCase = new UserBlankProfileCreationUseCase(
  userProfileRepository
);

const googleAuthUseCase = new GoogleAuthUseCase(
  userRepository,
  tokenService,
  userBlankProfileCreationUseCase,
  organizerBlankProfileCreationUseCase,
  userMapper
);
const googleAuthService = new GoogleAuthService();
export const googleAuthController = new GoogleAuthController(
  googleAuthService,
  googleAuthUseCase
);

//

export const stripeWebhookService = new StripeWebhookService(
  process.env.STRIPE_SECRET_KEY!
);
const subscriptionEntityFactory = new OrganizerSubscriptionEntityFactory();
const subscriptionRepository = new OrganizerSubscriptionRepository(
  subscriptionEntityFactory
);
const organizerSubscriptionMapper = new OrganizerSubscriptionMapper();
const activateSubscriptionUseCase = new ActivateSubScriptionUseCase(
  subscriptionRepository,
  organizerSubscriptionMapper
);
const upgradeSubscriptionUseCase = new UpgradeSubscriptionUseCase(
  subscriptionRepository,
  organizerSubscriptionMapper
);

const bookingEntityFactory = new BookingEntityFactory();
export const bookingRepository = new BookingRepository(bookingEntityFactory);
const bookingMapper = new BookingMapper();
const confirmBookingUseCase = new ConfirmBookingUseCase(
  subscriptionRepository,
  bookingRepository,
  bookingMapper
);

const cloudinaryStorageService = new CloudinaryStorageService();
const generateTicketUseCase = new GenerateTicketUseCase(
  bookingRepository,
  cloudinaryStorageService
);
const refundConfirmationTemplate = new RefundConfirmationEmailTemplate();

const handleEventCancelledRefundUseCase = new HandleEventCancelledRefundUseCase(
  bookingRepository,
  refundConfirmationTemplate,
  emailService
);

const handleStripeWebhookUseCase = new HandleStripeWebhookUseCase(
  stripeWebhookService,
  activateSubscriptionUseCase,
  upgradeSubscriptionUseCase,
  confirmBookingUseCase,
  generateTicketUseCase,
  handleEventCancelledRefundUseCase
);
export const stripeWebhookController = new StripeWebhookController(
  handleStripeWebhookUseCase
);
export const checkBlockedMiddleware = new CheckBlockedMiddleware(
  userRepository
);

const cloudinaryService = new CloudinaryService();
const organizerDocumentsCloudinaryService =
  new OrganizerDocumentsCloudinaryService();
const getKycUploadSignatureUseCase = new GetKycUploadSignatureUseCase(
  organizerDocumentsCloudinaryService
);
const generateSignedDownloadUrlUseCase = new GenerateSignedDownloadUrlUseCase(
  organizerDocumentsCloudinaryService
);
const getUploadSignatureUseCase = new GetUploadSignatureUseCase(
  cloudinaryService
);
export const cloudinaryController = new CloudinaryController(
  getUploadSignatureUseCase,
  getKycUploadSignatureUseCase,
  generateSignedDownloadUrlUseCase
);
