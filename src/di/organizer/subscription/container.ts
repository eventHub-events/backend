import { CreateSubscriptionCheckoutUseCase } from "../../../application/useCases/organizer/subscription/createSubscriptionCheckoutUseCase";
import { StripePaymentService } from "../../../infrastructure/services/StripeWebhookService/Stripe-payment/StripePaymentService";
  import dotenv from "dotenv";
import { SubscriptionPaymentController } from "../../../interfaceAdapter/controllers/organizer/subscriptionPaymentController";
import { OrganizerSubscriptionEntityFactory } from "../../../infrastructure/factories/organizer/OrganizerSubscriptionEntityFactory";
import { OrganizerSubscriptionRepository } from "../../../infrastructure/repositories/organizer/OrganizerSubscriptionRepository";
import { OrganizerSubscriptionMapper } from "../../../application/mapper/organizer/OrganizerSubscriptionMapper";
import { FetchSubscriptionByIdUseCase } from "../../../application/useCases/organizer/subscription/fetchSubscriptionByIdUseCase";
import { OrganizerSubscriptionRetrievalController } from "../../../interfaceAdapter/controllers/organizer/organizerSubscriptionRetrievalContoller";
  dotenv.config()

const stripePaymentService =  new StripePaymentService(process.env.STRIPE_SECRET_KEY!);
const createSubscriptionCheckoutUseCase = new CreateSubscriptionCheckoutUseCase(stripePaymentService);
export  const subscriptionPaymentController = new SubscriptionPaymentController(createSubscriptionCheckoutUseCase);

const subscriptionEntityFactory = new OrganizerSubscriptionEntityFactory();
const subscriptionRepository = new OrganizerSubscriptionRepository(subscriptionEntityFactory);
const organizerSubscriptionMapper = new OrganizerSubscriptionMapper();
const fetchSubscriptionByIdUseCase = new FetchSubscriptionByIdUseCase(subscriptionRepository, organizerSubscriptionMapper);
export const organizerSubscriptionRetrievalController = new OrganizerSubscriptionRetrievalController(fetchSubscriptionByIdUseCase);
