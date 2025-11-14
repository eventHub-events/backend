import { UserBookingListResponseDTO } from "../../../../DTOs/user/booking/UserBookingListResponseDTO";

export interface IGenerateTicketUseCase {
  execute(booking: UserBookingListResponseDTO) : Promise<string[]>;
}