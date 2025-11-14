import { CreateTicketPaymentUseCase } from "../../../application/useCases/user/payment/CreateTicketPaymentUseCase";
import { BookingEntityFactory } from "../../../infrastructure/factories/user/BookingEntityFactory";
import { BookingRepository } from "../../../infrastructure/repositories/user/booking/BookingRepository";
import { StripePaymentService } from "../../../infrastructure/services/StripeWebhookService/Stripe-payment/StripePaymentService";
import dotenv from "dotenv"
import { userRepository } from "../../common/commonContainers";
import { BookingPaymentController } from "../../../interfaceAdapter/controllers/user/BookingPaymentController";

dotenv.config()


const stripePaymentService =  new StripePaymentService(process.env.STRIPE_SECRET_KEY!);
const bookingEntityFactory = new BookingEntityFactory();
const bookingRepository = new BookingRepository(bookingEntityFactory);

const createTicketPaymentUseCase = new CreateTicketPaymentUseCase(stripePaymentService, bookingRepository, userRepository);

export const bookingPaymentController = new BookingPaymentController(createTicketPaymentUseCase);