import { BookingResponseDTOForAdmin } from "../../../../../domain/DTOs/admin/bookings/BookingResponseDTOForAdmin";
import { BookingFilterForAdminDTO } from "../../../../../domain/DTOs/admin/bookings/BookingsFilterForAdminDTO";


export interface IGetAllBookingsForAdminUseCase {
  execute(filter: BookingFilterForAdminDTO): Promise<{mappedBookings:BookingResponseDTOForAdmin[], totalPages:number }> ;
}