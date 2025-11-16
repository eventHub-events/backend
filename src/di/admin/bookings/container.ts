import { BookingMapperAdmin } from "../../../application/mapper/admin/BookingMapperAdmin";
import { BookingMapper } from "../../../application/mapper/user/BookingMapper";
import { GetAllBookingsForAdminUseCase } from "../../../application/useCases/admin/bookings/GetAllBookingsForAdminUseCase";
import { GetUserBookingByIdForAdminUseCase } from "../../../application/useCases/admin/bookings/GetBookingByIdForAdminUseCase";
import { BookingEntityFactory } from "../../../infrastructure/factories/user/BookingEntityFactory";
import { BookingRepository } from "../../../infrastructure/repositories/user/booking/BookingRepository";
import { BookingControllerForAdmin } from "../../../interfaceAdapter/controllers/admin/BookingControllerForAdmin";


const bookingEntityFactory = new BookingEntityFactory();
const bookingRepository = new BookingRepository(bookingEntityFactory);
const bookingMapperAdmin = new BookingMapperAdmin();
const bookingMapper =  new BookingMapper ();
const getUserBookingByIdForAdminUseCase = new GetUserBookingByIdForAdminUseCase(bookingRepository, bookingMapper);
const getAllBookingsForAdminUseCase = new GetAllBookingsForAdminUseCase(bookingRepository, bookingMapperAdmin);
export const bookingControllerForAdmin = new BookingControllerForAdmin(getAllBookingsForAdminUseCase,getUserBookingByIdForAdminUseCase );