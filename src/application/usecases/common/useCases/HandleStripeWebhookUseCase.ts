import Stripe from "stripe";
import { IActivateSubscriptionUseCase } from "../../../interface/useCases/organizer/subscription/IActivateSubscriptionUseCase";
import { IStripeWebhookService } from "../../../service/common/IStripeWebhookService";
import { IUpgradeSubscriptionUseCase } from "../../../interface/useCases/organizer/subscription/IUpgradeSubscriptionUseCase";
import { IConfirmBookingUseCase } from "../../../interface/useCases/user/booking/IConfirmBookingUseCase";
import { IGenerateTicketUseCase } from "../../../interface/useCases/user/ticketing/IGenerateTicketUseCase";
import { IHandleEventCancelledRefundUseCase } from "../../../interface/useCases/common/event-cancel/IHandleEventCancelledRefundUseCase";

export class HandleStripeWebhookUseCase {
  constructor(
   
    private _stripeWebhookService: IStripeWebhookService,
    private _activateSubscriptionUseCase: IActivateSubscriptionUseCase,
    private _upgradeSubscriptionUseCase : IUpgradeSubscriptionUseCase,
    private _confirmBookingUseCase : IConfirmBookingUseCase,
    private _generateTicketUseCase : IGenerateTicketUseCase,
    private _handleEventCancelledRefundUseCase : IHandleEventCancelledRefundUseCase
  ) {}

  async execute(payload: Buffer, signature: string): Promise<void> {
    const event = this._stripeWebhookService.constructEvent(payload, signature);
     const session = event.data.object as Stripe.Checkout.Session;
     
         const paymentIntentId = session.payment_intent as string;  
         const metadata =  session.metadata || {};
         console.log()

    switch (event.type) {
      case "checkout.session.completed":
       
         console.log("meta data", metadata)
         if(metadata.paymentType === "subscription"){
             console.log("💼 Activating organizer subscription...");
                const{ organizerName, organizerId, planName, durationInDays, planId , organizerEmail,payoutDelayDays, price,commissionRate} = metadata;
                const dto = {
                    organizerName,
                    organizerId,
                    planName,
                    planId,
                    organizerEmail,
                    durationInDays: parseInt(durationInDays),
                    payoutDelayDays: parseInt(payoutDelayDays),
                    price: parseInt(price),
                    paymentId: session.id,
                    commissionRate: Number(commissionRate)
                }

             
            await this._activateSubscriptionUseCase.execute(dto)
        return 
         }

         else if(metadata.paymentType === "subscription-upgrade") {
                  const{ organizerName, organizerId, planName, durationInDays, planId , organizerEmail,payoutDelayDays,price, commissionRate } = metadata;
                const dto = {
                    organizerName,
                    organizerId,
                    planName,
                    planId,
                    organizerEmail,
                    durationInDays: parseInt(durationInDays),
                    payoutDelayDays: parseInt(payoutDelayDays),
                    price: parseInt(price),
                    paymentId: session.id,
                    commissionRate: Number(commissionRate)
                }
              await this._upgradeSubscriptionUseCase.execute(dto);
              return
         }else if(metadata.paymentType === "ticket") {
               console.log("metadata", metadata);
              const {bookingId, organizerId} = metadata;
              const paymentId = session.id
             const bookingData = await this._confirmBookingUseCase.execute(organizerId,bookingId, paymentId, paymentIntentId);
             const qrUrls = await this._generateTicketUseCase.execute(bookingData);
             console.log("🎟️ Tickets generated:", qrUrls);
         }
        break;

        case "charge.refunded" : {
          const charge = event.data.object as Stripe.Charge;
          await this._handleEventCancelledRefundUseCase.execute({
             paymentId: charge.payment_intent as string,
             refundAmount: charge.amount_refunded/100
            }
          );
          break;
        }
         
           case "charge.refund.updated": {
                    const refund = event.data.object as Stripe.Refund;

                  if (!refund.payment_intent) return;

                   if (refund.status === "succeeded") {
                  await this._handleEventCancelledRefundUseCase.execute({
                  paymentId: refund.payment_intent as string,
                    
                    refundAmount: refund.amount / 100,
                     });
                   }      

            // if (refund.status === "failed") {
            //     await this._handleEventCancelledRefundUseCase.execute({
            //         paymentIntentId: refund.payment_intent as string,
            //            status: "FAILED",
            //       failureReason: refund.failure_reason ?? "unknown",
            //     });
            //   }

             break;
         }

      case "payment_intent.succeeded":
        console.log("💰 Payment succeeded:", event.data.object);
        break;

      case "payment_intent.payment_failed":
        console.log("❌ Payment failed:", event.data.object);
        break;

      default:
        console.log(`ℹ️ Unhandled event type: ${event.type}`);
    }
  }
}