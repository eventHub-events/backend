import { BookingFilterDTO } from '../../../../DTOs/organizer/bookings/bookingFilterDTO';
import { BookingResponseDTO } from '../../../../DTOs/user/booking/BookingResponseDTO';

export interface IGetAllBookingsByEventIdUseCase {
  execute(
    filter: BookingFilterDTO
  ): Promise<{ mappedBookings: BookingResponseDTO[]; totalPages: number }>;
}
