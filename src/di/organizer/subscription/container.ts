import { CreateSubscriptionCheckoutUseCase } from '../../../application/useCases/organizer/subscription/createSubscriptionCheckoutUseCase';
import { StripePaymentService } from '../../../infrastructure/services/StripeWebhookService/Stripe-payment/StripePaymentService';
import dotenv from 'dotenv';
import { SubscriptionPaymentController } from '../../../interfaceAdapter/controllers/organizer/subscriptionPaymentController';
import { OrganizerSubscriptionEntityFactory } from '../../../infrastructure/factories/organizer/OrganizerSubscriptionEntityFactory';
import { OrganizerSubscriptionRepository } from '../../../infrastructure/repositories/organizer/OrganizerSubscriptionRepository';
import { OrganizerSubscriptionMapper } from '../../../application/mapper/organizer/OrganizerSubscriptionMapper';
import { FetchSubscriptionByIdUseCase } from '../../../application/useCases/organizer/subscription/fetchSubscriptionByIdUseCase';
import { OrganizerSubscriptionRetrievalController } from '../../../interfaceAdapter/controllers/organizer/organizerSubscriptionRetrievalContoller';
import { ExpireSubscriptionUseCase } from '../../../application/useCases/organizer/subscription/expireSubscriptionUseCase';
import { CronSubscriptionExpiryJob } from '../../../infrastructure/jobs/CronSubscriptionExpiryJob';
import { SubscriptionExpiryMonitor } from '../../../infrastructure/jobs/SubscriptionExpiryMonitor';
import { FetchSubscriptionPlansForOrganizerUseCase } from '../../../application/useCases/organizer/subscription/fetchSubscriptionPlansUseCase';
import { SubscriptionEntityFactory } from '../../../infrastructure/factories/admin/SubscriptionEntityFactory';
import { SubscriptionPlansRepository } from '../../../infrastructure/repositories/admin/SubscriptionPlansRepository';
import { SubscriptionMapper } from '../../../application/mapper/admin/SubscriptionMapper';

dotenv.config();

const stripePaymentService = new StripePaymentService(
  process.env.STRIPE_SECRET_KEY!
);
const createSubscriptionCheckoutUseCase = new CreateSubscriptionCheckoutUseCase(
  stripePaymentService
);
export const subscriptionPaymentController = new SubscriptionPaymentController(
  createSubscriptionCheckoutUseCase
);

const subscriptionEntityFactory = new OrganizerSubscriptionEntityFactory();
const subscriptionRepository = new OrganizerSubscriptionRepository(
  subscriptionEntityFactory
);
const organizerSubscriptionMapper = new OrganizerSubscriptionMapper();
const fetchSubscriptionByIdUseCase = new FetchSubscriptionByIdUseCase(
  subscriptionRepository,
  organizerSubscriptionMapper
);

const subscriptionPlansEntityFactory = new SubscriptionEntityFactory();
const subscriptionPlansRepository = new SubscriptionPlansRepository(
  subscriptionPlansEntityFactory
);
const subscriptionPlansMapper = new SubscriptionMapper();
const fetchAllSubscriptionPlansUseCase =
  new FetchSubscriptionPlansForOrganizerUseCase(
    subscriptionPlansRepository,
    subscriptionPlansMapper
  );
export const organizerSubscriptionRetrievalController =
  new OrganizerSubscriptionRetrievalController(
    fetchSubscriptionByIdUseCase,
    fetchAllSubscriptionPlansUseCase
  );

const expireSubscriptionUseCase = new ExpireSubscriptionUseCase(
  subscriptionRepository
);
const cronSubscriptionExpiryJob = new CronSubscriptionExpiryJob(
  undefined,
  expireSubscriptionUseCase
);
export const subscriptionExpiryMonitor = new SubscriptionExpiryMonitor(
  cronSubscriptionExpiryJob
);
