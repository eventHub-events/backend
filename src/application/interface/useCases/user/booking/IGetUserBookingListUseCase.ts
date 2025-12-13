import { BookingFilterDTO } from '../../../../DTOs/organizer/bookings/bookingFilterDTO';
import { UserBookingListResponseDTO } from '../../../../DTOs/user/booking/UserBookingListResponseDTO';

export interface IGetUserBookingListUseCase {
  execute(filter: BookingFilterDTO): Promise<{
    bookingsList: UserBookingListResponseDTO[];
    totalPages: number;
  }>;
}
