
import { IOrganizerSubscriptionRepository } from "../../../../domain/repositories/organizer/IOrganizerSubscriptionRepository";
import { IBookingRepository } from "../../../../domain/repositories/user/IBookingRepository";
import { IConfirmBookingUseCase } from "../../../interface/useCases/user/booking/IConfirmBookingUseCase";
import { NotFoundError } from "../../../../domain/errors/common";
import { BookingStatus, PayoutStatus } from "../../../../domain/enums/user/Booking";
import { IBookingMapper } from "../../../interface/mapper/user/IBookingMapper";
import { UserBookingListResponseDTO } from "../../../DTOs/user/booking/UserBookingListResponseDTO";

export class ConfirmBookingUseCase implements IConfirmBookingUseCase {

   constructor(
         private _subscriptionRepository : IOrganizerSubscriptionRepository,
         private _bookingRepository : IBookingRepository,
         private _bookingMapper : IBookingMapper
   ){}
   async execute(organizerId: string, bookingId: string, paymentId: string): Promise<UserBookingListResponseDTO> {
    
       const subscription =  await this._subscriptionRepository.fetchSubscriptionById(organizerId);
       if(!subscription) throw new Error("Subscription details not found");

       const payoutDelayDays = subscription.payoutDelayDays ?? 14
         const booking = await this._bookingRepository.findBookingById(bookingId);
         
        if(!booking) throw new NotFoundError("Booking details not found");
           const status = BookingStatus.CONFIRMED;
            const eventDate =  new Date(booking.eventDate);
          const payoutDueDate = new Date(eventDate);
          payoutDueDate.setDate(eventDate.getDate() + payoutDelayDays);
           const payoutStatus  = PayoutStatus.PENDING

           booking.update({status, payoutDueDate,payoutStatus,paymentId});
         const updated = await this._bookingRepository.updateBooking(bookingId, booking);
      return this._bookingMapper.toUserResponseDTO(updated);

   }
}