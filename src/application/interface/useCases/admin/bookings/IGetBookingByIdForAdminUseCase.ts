import { UserBookingListResponseDTO } from '../../../../DTOs/user/booking/UserBookingListResponseDTO';

export interface IGetUserBookingByIdForAdminUseCase {
  execute(bookingId: string): Promise<UserBookingListResponseDTO>;
}
