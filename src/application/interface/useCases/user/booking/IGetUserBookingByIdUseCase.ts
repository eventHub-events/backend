import { UserBookingListResponseDTO } from '../../../../DTOs/user/booking/UserBookingListResponseDTO';

export interface IGetUserBookingById {
  execute(bookingId: string): Promise<UserBookingListResponseDTO>;
}
