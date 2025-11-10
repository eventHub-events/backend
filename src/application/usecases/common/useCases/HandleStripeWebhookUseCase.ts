import Stripe from "stripe";
import { IActivateSubscriptionUseCase } from "../../../interface/useCases/organizer/subscription/IActivateSubscriptionUseCase";
import { IStripeWebhookService } from "../../../service/common/IStripeWebhookService";

export class HandleStripeWebhookUseCase {
  constructor(
   
    private _stripeWebhookService: IStripeWebhookService,
    private _activateSubscriptionUseCase: IActivateSubscriptionUseCase
  ) {}

  async execute(payload: Buffer, signature: string): Promise<void> {
    const event = this._stripeWebhookService.constructEvent(payload, signature);

    switch (event.type) {
      case "checkout.session.completed":
       const session = event.data.object as Stripe.Checkout.Session;
         const metadata =  session.metadata || {};

         console.log("meta data", metadata)
         if(metadata.paymentType === "subscription"){
             console.log("💼 Activating organizer subscription...");
                const{ organizerName, organizerId, planName, durationInDays, planId , organizerEmail , paymentId} = metadata;
                const dto = {
                    organizerName,
                    organizerId,
                    planName,
                    planId,
                    organizerEmail,
                    durationInDays: parseInt(durationInDays),
                    paymentId: session.id
                }

                console.log("dto is" , dto)
            await this._activateSubscriptionUseCase.execute(dto)
        return 
         }
        break;

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