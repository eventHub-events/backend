import { BookingResponseDTO } from '../../../../DTOs/user/booking/BookingResponseDTO';
import { BookingFilterDTO } from '../../../../DTOs/organizer/bookings/bookingFilterDTO';

export interface IGetAllBookingsUseCase {
  execute(
    filter: BookingFilterDTO
  ): Promise<{ mappedBookings: BookingResponseDTO[]; totalPages: number }>;
}
