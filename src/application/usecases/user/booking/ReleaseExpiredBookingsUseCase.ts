import { ErrorMessages } from '../../../../constants/errorMessages';
import { NotFoundError } from '../../../../domain/errors/common';
import { IEventTicketingRepository } from '../../../../domain/repositories/organizer/IEventTicketingRepository';
import { IBookingRepository } from '../../../../domain/repositories/user/IBookingRepository';
import { IReleaseExpiredBookingsUseCase } from '../../../interface/useCases/user/booking/IReleaseExpiredBookingsUseCase';

export class ReleaseExpiredBookingsUseCase implements IReleaseExpiredBookingsUseCase {
  constructor(
    private readonly _bookingRepo: IBookingRepository,
    private readonly _eventTicketingRepo: IEventTicketingRepository
  ) {}
  async execute(now?: Date): Promise<void> {
    const expiredBookings = await this._bookingRepo.findExpiredPending(now);
    if (!expiredBookings)
      throw new NotFoundError(ErrorMessages.BOOKING.BOOKINGS_NOT_FOUND);

    for (const booking of expiredBookings) {
      await this._eventTicketingRepo.releaseMultipleSeats(
        booking.eventId.toString(),
        booking.tickets.map(t => ({
          name: t.name,
          quantity: t.quantity,
        }))
      );
      booking.markAsExpired();

      await this._bookingRepo.updateBooking(booking.id!.toString()!, booking);
    }
  }
}
