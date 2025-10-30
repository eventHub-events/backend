import { BookingMapper } from "../../../application/mapper/user/BookingMapper";
import { GetAllBookingsUseCase } from "../../../application/useCases/organizer/booking/GetAllBookingsUseCase";
import { BookingEntityFactory } from "../../../infrastructure/factories/user/BookingEntityFactory";
import { BookingRepository } from "../../../infrastructure/repositories/user/BookingRepository";
import { BookingsDisplayController } from "../../../interfaceAdapter/controllers/organizer/BookingsDisplayController";

const bookingEntityFactory = new BookingEntityFactory();
const bookingRepository = new BookingRepository(bookingEntityFactory);
const bookingMapper =  new BookingMapper();
const getAllBookingsUseCase = new GetAllBookingsUseCase(bookingRepository, bookingMapper);
export const bookingsDisplayController = new BookingsDisplayController(getAllBookingsUseCase);

