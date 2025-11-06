import { BookingDetailsByIdMapper } from "../../../application/mapper/organizer/BookingDetailsByIdMapper";
import { BookingMapper } from "../../../application/mapper/user/BookingMapper";
import { GetAllBookingsUseCase } from "../../../application/useCases/organizer/booking/GetAllBookingsUseCase";
import { GetBookingDetailsByIdUseCase } from "../../../application/useCases/organizer/booking/GetBookingDetailsByIdUseCase";
import { BookingEntityFactory } from "../../../infrastructure/factories/user/BookingEntityFactory";
import { BookingRepository } from "../../../infrastructure/repositories/user/booking/BookingRepository";
import { BookingsDisplayController } from "../../../interfaceAdapter/controllers/organizer/BookingsDisplayController";

const bookingEntityFactory = new BookingEntityFactory();
const bookingRepository = new BookingRepository(bookingEntityFactory);
const bookingMapper =  new BookingMapper();
const getAllBookingsUseCase = new GetAllBookingsUseCase(bookingRepository, bookingMapper);
const bookingDetailsByIdMapper = new BookingDetailsByIdMapper();

const getBookingDetailsByIdUseCase = new GetBookingDetailsByIdUseCase(bookingRepository, bookingDetailsByIdMapper);
export const bookingsDisplayController = new BookingsDisplayController(getAllBookingsUseCase, getBookingDetailsByIdUseCase);

