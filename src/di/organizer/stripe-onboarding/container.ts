import { CreateStripeAccountUseCase } from "../../../application/useCases/organizer/stripe-account/createStripeAccountUseCase";
import { UserEntityFactory } from "../../../infrastructure/factories/UserEntityFactory";
import { UserRepository } from "../../../infrastructure/repositories/UserRepository";
import { WinstonLoggerService } from "../../../infrastructure/services/logger/loggerService";
import { StripeConnectService } from "../../../infrastructure/services/stripeConnectService/StripeConnectService";
import dotenv from "dotenv";
import { StripeConnectController } from "../../../interfaceAdapter/controllers/organizer/stripeConnectController";
import { VerifyStripeOnboardingStatusUseCase } from "../../../application/useCases/organizer/stripe-account/verifyStripeOnboardingStatusUseCase";
import { StripeOnboardingStatusController } from "../../../interfaceAdapter/controllers/organizer/stripeOnboardingStatusController";
dotenv.config()


const loggerService= new WinstonLoggerService();
const userEntityFactory = new UserEntityFactory();
const userRepository = new UserRepository(loggerService,userEntityFactory);
const stripeConnectService = new StripeConnectService(process.env.STRIPE_SECRET_KEY!);
const createStripeAccountUseCase = new CreateStripeAccountUseCase(userRepository, stripeConnectService);
export const stripeConnectController =  new StripeConnectController(createStripeAccountUseCase);

const verifyStripeOnboardingStatusUseCase = new VerifyStripeOnboardingStatusUseCase(userRepository, stripeConnectService);
export const stripeOnboardingStatusController = new StripeOnboardingStatusController(verifyStripeOnboardingStatusUseCase);

