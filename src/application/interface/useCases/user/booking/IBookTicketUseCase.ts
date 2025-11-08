import { BookingRequestDTO } from "../../../../DTOs/user/booking/BookingRequestDTO";
import { BookingResponseDTO } from "../../../../DTOs/user/booking/BookingResponseDTO";

export interface IBookTicketUseCase {
  execute(eventId: string, dto: BookingRequestDTO) :Promise<BookingResponseDTO>;
}