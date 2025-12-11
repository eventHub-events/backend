import { ErrorMessages } from "../../../../constants/errorMessages";
import { BookingStatus } from "../../../../domain/enums/user/Booking";
import { NotFoundError } from "../../../../domain/errors/common";
import { IBookingRepository } from "../../../../domain/repositories/user/IBookingRepository";
import { IUserRepository } from "../../../../domain/repositories/user/IUserRepository";
import { ICreateTicketPaymentUseCase } from "../../../interface/useCases/user/payment/ICreatetTicketPaymentUseCase";
import { IStripePaymentService } from "../../../service/common/IStripePaymentService";

export class CreateTicketPaymentUseCase  implements ICreateTicketPaymentUseCase{
      constructor(
            private _paymentService : IStripePaymentService,
            private _bookingRepository : IBookingRepository,
            private _userRepository : IUserRepository
      ){}

 async execute(bookingId: string): Promise<string> {
      
          const booking = await this._bookingRepository.findBookingById(bookingId);

        if(!booking) throw new NotFoundError(ErrorMessages.BOOKING.BOOKING_NOT_FOUND);
        if(booking.status !== BookingStatus.PENDING_PAYMENT) throw new Error(ErrorMessages.BOOKING.BOOKING_ALREADY_PROCESSED);

        const organizer = await this._userRepository.findUserById(booking.organizerId.toString());
        
        if(!organizer) throw new Error(ErrorMessages.ORGANIZER.NOT_FOUND)
         const organizerStripeId = organizer.stripeAccountId;
      
      const url = await this._paymentService.createBookingCheckout({
          bookingId,
          userId: booking.userId.toString(),
          organizerId: booking.organizerId.toString(),
          totalAmount : booking.totalAmount,
          eventTitle: booking.eventTitle,
          organizerStripeId,
          platformCommissionRate: booking.commissionRate
      })
    
    return url;
 }
}