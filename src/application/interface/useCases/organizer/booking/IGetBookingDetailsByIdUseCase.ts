import { BookingDetailsByIdResponseDTO } from "../../../../../domain/DTOs/organizer/bookings/bookingDetailsByIdResponseDTO";

export interface IGetBookingDetailsByIdUseCase {
  execute(bookingId : string) : Promise<BookingDetailsByIdResponseDTO> ;

}