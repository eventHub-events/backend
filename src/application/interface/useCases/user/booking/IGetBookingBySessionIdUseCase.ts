import { UserBookingListResponseDTO } from '../../../../DTOs/user/booking/UserBookingListResponseDTO';

export interface IGetBookingBySessionId {
  execute(sessionId: string): Promise<UserBookingListResponseDTO>;
}
