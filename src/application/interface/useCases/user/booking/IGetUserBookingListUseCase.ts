import { BookingFilterDTO } from "../../../../../domain/DTOs/organizer/bookings/bookingFilterDTO";
import { UserBookingListResponseDTO } from "../../../../../domain/DTOs/user/booking/UserBookingListResponseDTO";

export interface IGetUserBookingListUseCase {
  execute(userId : string, dto:BookingFilterDTO) : Promise<UserBookingListResponseDTO[]>;
}