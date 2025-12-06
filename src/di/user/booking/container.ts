import { BookingMapper } from "../../../application/mapper/user/BookingMapper";
import { BookTicketUseCase } from "../../../application/useCases/user/booking/BookTicketUseCase";
import { CancelPaidBookingUseCase } from "../../../application/useCases/user/booking/CancelPaidBookingUseCase";
import { GetUserBookingBySessionId } from "../../../application/useCases/user/booking/GetBookingBySessionIdUseCase";
import { GetUserBookingByIdUseCase } from "../../../application/useCases/user/booking/GetUserBookingByIdUseCase";
import { GetUserBookingListUseCase } from "../../../application/useCases/user/booking/GetUserBookingListUseCase";
import { ReleaseExpiredBookingsUseCase } from "../../../application/useCases/user/booking/ReleaseExpiredBookingsUseCase";
import { EventCancellationPolicy } from "../../../domain/policies/EventCancellationPolicy";
import { EventTicketingEntityFactory } from "../../../infrastructure/factories/organizer/EventTicketingEntityFactory";
import { BookingEntityFactory } from "../../../infrastructure/factories/user/BookingEntityFactory";
import { BookingsExpirationScheduler } from "../../../infrastructure/jobs/BookingsExpirationScheduler";
import { EventTicketingRepository } from "../../../infrastructure/repositories/organizer/EventTicketingRepository";
import { BookingRepository } from "../../../infrastructure/repositories/user/booking/BookingRepository";
import { StripePaymentService } from "../../../infrastructure/services/StripeWebhookService/Stripe-payment/StripePaymentService";
import { EventBookingController } from "../../../interfaceAdapter/controllers/user/EventBookingController";
import { GetUserBookingsController } from "../../../interfaceAdapter/controllers/user/GetUserBookingsController";
  import dotenv from "dotenv";
  dotenv.config();
const bookingEntityFactory = new BookingEntityFactory();
const bookingRepository = new BookingRepository(bookingEntityFactory);
const bookingMapper =  new BookingMapper ();

const eventTicketingEntityFactory = new EventTicketingEntityFactory();
const  ticketingRepository = new EventTicketingRepository(eventTicketingEntityFactory);

const bookTicketUseCase = new BookTicketUseCase(ticketingRepository, bookingRepository, bookingMapper);

const getUserBookingsListUseCase = new GetUserBookingListUseCase(bookingRepository, bookingMapper);
const getUserBookingByIdUseCase = new GetUserBookingByIdUseCase(bookingRepository, bookingMapper);
const getBookingBySessionId  = new GetUserBookingBySessionId(bookingRepository, bookingMapper);
export const getUserBookingsController =  new GetUserBookingsController(getUserBookingsListUseCase, getUserBookingByIdUseCase, getBookingBySessionId);

const releaseExpiredBookingsUseCase = new ReleaseExpiredBookingsUseCase(bookingRepository,ticketingRepository );
export const bookingsExpirationScheduler = new BookingsExpirationScheduler(releaseExpiredBookingsUseCase);
const stripePaymentService =  new StripePaymentService(process.env.STRIPE_SECRET_KEY!);
const eventCancellationPolicy = new EventCancellationPolicy();
const cancelPaidBookingUseCase = new CancelPaidBookingUseCase(bookingRepository, ticketingRepository, stripePaymentService, eventCancellationPolicy);

export const eventBookingController = new EventBookingController(bookTicketUseCase, cancelPaidBookingUseCase);
