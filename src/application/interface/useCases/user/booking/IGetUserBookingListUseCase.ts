import { BookingFilterDTO } from "../../../../../domain/DTOs/organizer/bookings/bookingFilterDTO";
import { UserBookingListResponseDTO } from "../../../../../domain/DTOs/user/booking/UserBookingListResponseDTO";

export interface IGetUserBookingListUseCase {
  execute( filter: BookingFilterDTO): Promise<{bookingsList:UserBookingListResponseDTO[],totalPages: number}>;
}