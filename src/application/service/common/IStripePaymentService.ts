import { BookingCheckoutDTO } from "../../DTOs/user/payment/BookingCheckoutDTO"

export interface IStripePaymentService {
   createSubscriptionCheckout(
    data: {
       planName: string,
       price: number,
       organizerId :string,
       durationInDays: number,
       organizerName: string,
       organizerEmail: string
       planId: string,

}): Promise<string>
   createUpgradeSubscriptionCheckout(
    data: {
       planName: string,
       price: number,
       organizerId :string,
       durationInDays: number,
       organizerName: string,
       organizerEmail: string
       planId: string,

}): Promise<string>
  
createBookingCheckout(dto :BookingCheckoutDTO ): Promise<string>
}