import { BookingDetailsByIdResponseDTO } from "../../../../../domain/DTOs/organizer/bookings/bookingDetailsByIdResponseDTO";

export interface IGetBookingDetailsByIdUseCase {
  execute(booingId : string) : Promise<BookingDetailsByIdResponseDTO> ;
  
}