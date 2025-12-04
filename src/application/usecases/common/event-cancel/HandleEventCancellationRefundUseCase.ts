import { ErrorMessages } from "../../../../constants/errorMessages";
import { BookingStatus } from "../../../../domain/enums/user/Booking";
import { NotFoundError } from "../../../../domain/errors/common";
import { IBookingRepository } from "../../../../domain/repositories/user/IBookingRepository";
import { IHandleEventCancellationUseCase } from "../../../interface/useCases/common/event-cancel/IHandleEventCancellationUseCase";
import { IStripePaymentService } from "../../../service/common/IStripePaymentService";

export class HandleEventCancellationRefundUseCase implements IHandleEventCancellationUseCase {
  
    constructor(
         private  _bookingRepo : IBookingRepository,
         private _stripeService : IStripePaymentService
    ){}
  async execute(eventId: string): Promise<void> {
      const bookings = await this._bookingRepo.findBookingsByEventIdAndStatus(eventId, BookingStatus.CONFIRMED);
      if(!bookings) throw new NotFoundError(ErrorMessages.BOOKING.BOOKINGS_NOT_FOUND);
      for(const booking of bookings) {
        console.log("Refunding paymentIntentId:", booking.paymentIntentId);
         await this._stripeService.refundPayment(booking.paymentIntentId!);
      }
  }
}