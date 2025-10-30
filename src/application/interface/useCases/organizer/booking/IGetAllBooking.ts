
import { BookingResponseDTO } from "../../../../../domain/DTOs/user/booking/BookingResponseDTO";
import { BookingFilterDTO } from "../../../../../domain/DTOs/organizer/bookings/bookingFilterDTO";

export interface IGetAllBookingsUseCase{
execute(filter: BookingFilterDTO): Promise<{ mappedBookings: BookingResponseDTO[]; totalPages: number; }>;
}