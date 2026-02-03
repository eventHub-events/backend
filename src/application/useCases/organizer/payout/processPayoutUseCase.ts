import Stripe from 'stripe';
import { IProcessPayoutUseCase } from '../../../interface/useCases/organizer/payout/IProcessPayoutUseCase';
import { IBookingRepository } from '../../../../domain/repositories/user/IBookingRepository';
import { NotFoundError } from '../../../../domain/errors/common';
import { PayoutStatus } from '../../../../domain/enums/user/Booking';
import { ErrorMessages } from '../../../../constants/errorMessages';

export class ProcessPayoutUseCase implements IProcessPayoutUseCase {
  constructor(
    private _bookingRepo: IBookingRepository,
    private readonly _stripe: Stripe
  ) {}

  async execute(): Promise<void> {
    const currentDate = new Date();
    const dueBookings =
      await this._bookingRepo.findBookingsDueForPayout(currentDate);
    if (!dueBookings)
      throw new NotFoundError(ErrorMessages.BOOKING.NO_DUE_BOOKINGS_FOUND);
    console.log('due bookings', dueBookings);

    const organizerMap = new Map<
      string,
      { totalAmount: number; bookingIds: string[] }
    >();

    for (const booking of dueBookings) {
      const organizerId = booking.organizerStripeId;
      if (!organizerId) continue;

      const data = organizerMap.get(organizerId) || {
        totalAmount: 0,
        bookingIds: [],
      };
      data.totalAmount += booking.organizerAmount!;
      data.bookingIds.push(booking.id!.toString());
      organizerMap.set(organizerId, data);
    }

    for (const [
      organizerStripeId,
      { totalAmount, bookingIds },
    ] of organizerMap) {
      try {
        await this._stripe.transfers.create({
          amount: Math.round(totalAmount * 100), 
          currency: 'usd',
          destination: organizerStripeId,
        });
        console.log(
          `✅ ₹${totalAmount} payout sent to organizer ${organizerStripeId}`
        );
        await this._bookingRepo.updateManyBookings(
          { _id: { $in: bookingIds } },
          { payoutStatus: PayoutStatus.PAID, payoutDate: new Date() }
        );
      } catch (err) {
        console.error(
          `❌ Failed payout for organizer ${organizerStripeId}:`,
          err
        );
      }
    }
  }
}
