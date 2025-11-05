import { BookingMapper } from "../../../application/mapper/user/BookingMapper";
import { BookTicketUseCase } from "../../../application/useCases/user/booking/BookTicketUseCase";
import { EventTicketingEntityFactory } from "../../../infrastructure/factories/organizer/EventTicketingEntityFactory";
import { BookingEntityFactory } from "../../../infrastructure/factories/user/BookingEntityFactory";
import { EventTicketingRepository } from "../../../infrastructure/repositories/organizer/EventTicketingRepository";
import { BookingRepository } from "../../../infrastructure/repositories/user/booking/BookingRepository";
import { EventBookingController } from "../../../interfaceAdapter/controllers/user/EventBookingController";

const bookingEntityFactory = new BookingEntityFactory();
const bookingRepository = new BookingRepository(bookingEntityFactory);
const bookingMapper =  new BookingMapper ();

const eventTicketingEntityFactory = new EventTicketingEntityFactory();
const  ticketingRepository = new EventTicketingRepository(eventTicketingEntityFactory);

const bookTicketUseCase = new BookTicketUseCase(ticketingRepository, bookingRepository, bookingMapper);

export const eventBookingController = new EventBookingController(bookTicketUseCase);
