import { CreateStripeAccountUseCase } from '../../../application/useCases/organizer/stripe-account/createStripeAccountUseCase';
import { UserRepository } from '../../../infrastructure/repositories/UserRepository';
import { WinstonLoggerService } from '../../../infrastructure/services/logger/loggerService';
import { StripeConnectService } from '../../../infrastructure/services/stripeConnectService/StripeConnectService';
import { StripeConnectController } from '../../../interfaceAdapter/controllers/organizer/stripeConnectController';
import { VerifyStripeOnboardingStatusUseCase } from '../../../application/useCases/organizer/stripe-account/verifyStripeOnboardingStatusUseCase';
import { StripeOnboardingStatusController } from '../../../interfaceAdapter/controllers/organizer/stripeOnboardingStatusController';
import { UserEntityFactory } from '../../../infrastructure/factories/user/UserEntityFactory';
import { OrganizerStripeAccountRepository } from '../../../infrastructure/repositories/organizer/OrganizerStripeAccountRepository';
import { StripeAccountEntityFactory } from '../../../infrastructure/factories/organizer/OrganizerStripeAccountEntityFactory';
import { OrganizerStripeAccountMapper } from '../../../application/mapper/organizer/OrganizerStripeAccountMapper';
import { GetStripeAccountsUseCase } from '../../../application/useCases/organizer/stripe-account/getStripeAccountUseCase';
import { ENV } from '../../../infrastructure/config/common/env';

const loggerService = new WinstonLoggerService();
const userEntityFactory = new UserEntityFactory();
const userRepository = new UserRepository(loggerService, userEntityFactory);
const stripeConnectService = new StripeConnectService(ENV.STRIPE_SECRET_KEY!);

const organizerStripeEntityFactory = new StripeAccountEntityFactory();
const organizerStripeAccountRepository = new OrganizerStripeAccountRepository(
  organizerStripeEntityFactory
);
const organizerStripeAccountMapper = new OrganizerStripeAccountMapper();

const createStripeAccountUseCase = new CreateStripeAccountUseCase(
  userRepository,
  stripeConnectService,
  organizerStripeAccountRepository,
  organizerStripeAccountMapper
);
const getStripeAccountUseCase = new GetStripeAccountsUseCase(
  organizerStripeAccountRepository,
  organizerStripeAccountMapper
);
export const stripeConnectController = new StripeConnectController(
  createStripeAccountUseCase,
  getStripeAccountUseCase
);

const verifyStripeOnboardingStatusUseCase =
  new VerifyStripeOnboardingStatusUseCase(
    stripeConnectService,
    organizerStripeAccountRepository,
    userRepository
  );
export const stripeOnboardingStatusController =
  new StripeOnboardingStatusController(verifyStripeOnboardingStatusUseCase);
