import { UserBookingListResponseDTO } from '../../DTOs/user/booking/UserBookingListResponseDTO';

export interface IPdfTicketService {
  generate(
    booking: UserBookingListResponseDTO,
    ticket: { name: string; quantity: number; price: number }
  ): Promise<Buffer>;
}
