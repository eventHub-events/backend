import { UserBookingListResponseDTO } from "../../../../DTOs/user/booking/UserBookingListResponseDTO";

export interface IConfirmBookingUseCase {
  execute(organizerId: string, bookingId: string, paymentId: string): Promise<UserBookingListResponseDTO>;
}