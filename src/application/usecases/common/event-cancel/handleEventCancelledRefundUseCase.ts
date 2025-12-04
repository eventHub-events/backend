import { ErrorMessages } from "../../../../constants/errorMessages";
import { BookingStatus, PayoutStatus } from "../../../../domain/enums/user/Booking";
import { NotFoundError } from "../../../../domain/errors/common";
import { IBookingRepository } from "../../../../domain/repositories/user/IBookingRepository";
import { IHandleEventCancelledRefundUseCase } from "../../../interface/useCases/common/event-cancel/IHandleEventCancelledRefundUseCase";

export class HandleEventCancelledRefundUseCase  implements IHandleEventCancelledRefundUseCase {
      constructor(
        private _bookingRepo : IBookingRepository
      ){}
async execute(data:{paymentId: string, refundAmount: number}): Promise<void> {
     const {paymentId, refundAmount} = data;
      const booking = await this._bookingRepo.fetchBookingByPaymentIntentId(paymentId);
      if(!booking) throw new NotFoundError(ErrorMessages.BOOKING.BOOKINGS_NOT_FOUND);
      
         booking.status = BookingStatus.REFUNDED;
         booking.platformFee = 0;
         booking.organizerAmount = 0;
         booking.payoutStatus = PayoutStatus.CANCELLED;
         booking.refundedAmount = refundAmount;

       await this._bookingRepo.updateBooking(booking.id?.toString()!, booking)
}
}