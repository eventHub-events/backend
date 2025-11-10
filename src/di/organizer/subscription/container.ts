import { CreateSubscriptionCheckoutUseCase } from "../../../application/useCases/organizer/subscription/createSubscriptionCheckoutUseCase";
import { StripePaymentService } from "../../../infrastructure/services/StripeWebhookService/Stripe-payment/StripePaymentService";
  import dotenv from "dotenv";
import { SubscriptionPaymentController } from "../../../interfaceAdapter/controllers/organizer/subscriptionPaymentController";
  dotenv.config()

const stripePaymentService =  new StripePaymentService(process.env.STRIPE_SECRET_KEY!);
const createSubscriptionCheckoutUseCase = new CreateSubscriptionCheckoutUseCase(stripePaymentService);
export  const subscriptionPaymentController = new SubscriptionPaymentController(createSubscriptionCheckoutUseCase);
