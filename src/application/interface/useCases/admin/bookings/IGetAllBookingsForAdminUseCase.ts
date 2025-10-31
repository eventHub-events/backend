import { BookingResponseDTOForAdmin } from "../../../../../domain/DTOs/admin/bookings/BookingResponseDTOForAdmin";
import { BookingFilterDTO } from "../../../../../domain/DTOs/organizer/bookings/bookingFilterDTO";

export interface IGetAllBookingsForAdminUseCase {
  execute(dto: BookingFilterDTO) : Promise<BookingResponseDTOForAdmin> ;
}