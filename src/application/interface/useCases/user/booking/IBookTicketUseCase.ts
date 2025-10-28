import { BookingRequestDTO } from "../../../../../domain/DTOs/user/booking/BookingRequestDTO";
import { BookingResponseDTO } from "../../../../../domain/DTOs/user/booking/BookingResponseDTO";

export interface IBookTicketUseCase {
  execute(eventId: string, dto: BookingRequestDTO) :Promise<BookingResponseDTO>;
}