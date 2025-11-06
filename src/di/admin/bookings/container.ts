import { BookingMapperAdmin } from "../../../application/mapper/admin/BookingMapperAdmin";
import { GetAllBookingsForAdminUseCase } from "../../../application/useCases/admin/bookings/GetAllBookingsForAdminUseCase";
import { BookingEntityFactory } from "../../../infrastructure/factories/user/BookingEntityFactory";
import { BookingRepository } from "../../../infrastructure/repositories/user/booking/BookingRepository";
import { BookingControllerForAdmin } from "../../../interfaceAdapter/controllers/admin/BookingControllerForAdmin";


const bookingEntityFactory = new BookingEntityFactory();
const bookingRepository = new BookingRepository(bookingEntityFactory);
const bookingMapperAdmin = new BookingMapperAdmin();

const getAllBookingsForAdminUseCase = new GetAllBookingsForAdminUseCase(bookingRepository, bookingMapperAdmin);
export const bookingControllerForAdmin = new BookingControllerForAdmin(getAllBookingsForAdminUseCase);