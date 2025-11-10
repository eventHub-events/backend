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
}