import { ErrorMessages } from "../../../../constants/errorMessages";
import { BookingStatus } from "../../../../domain/enums/user/Booking";
import { BadRequestError, NotFoundError } from "../../../../domain/errors/common";
import { ICancellationPolicy } from "../../../../domain/interface/policies/ICancellationPolicy";
import { IEventTicketingRepository } from "../../../../domain/repositories/organizer/IEventTicketingRepository";
import { IBookingRepository } from "../../../../domain/repositories/user/IBookingRepository";
import { ICancelPaidBookingUseCase } from "../../../interface/useCases/user/booking/ICancelPaidBookingUseCase";
import { IStripePaymentService } from "../../../service/common/IStripePaymentService";

export class CancelPaidBookingUseCase implements ICancelPaidBookingUseCase {
constructor(
    private readonly _bookingRepo : IBookingRepository,
    private readonly _eventTicketRepo : IEventTicketingRepository,
    private readonly _paymentService : IStripePaymentService,
    private readonly _cancellationPolicy : ICancellationPolicy
){}

async execute(userId: string, bookingId: string): Promise<void> {
     const booking = await this._bookingRepo.findBookingById(bookingId);

     if(!booking) throw new NotFoundError(ErrorMessages.BOOKING.BOOKING_NOT_FOUND);

     if(booking.userId.toString() !== userId) throw new BadRequestError(ErrorMessages.COMMON.FORBIDDEN);
     if(booking.status !== BookingStatus.CONFIRMED) throw new BadRequestError(ErrorMessages.REFUND.PAID_REQUEST_ERROR);

        const eventDate = new Date(booking.eventDate);
     const allowed = this._cancellationPolicy.canUserCancelBooking(eventDate, new Date);

      if(!allowed) throw new BadRequestError(ErrorMessages.REFUND.CANCEL_WINDOW_CLOSED);

}
}