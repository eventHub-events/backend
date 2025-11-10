import { IStripeWebhookService } from "../../../service/common/IStripeWebhookService";

export class HandleStripeWebhookUseCase {
  constructor(
   
    private _stripeWebhookService: IStripeWebhookService
  ) {}

  async execute(payload: Buffer, signature: string): Promise<void> {
    const event = this._stripeWebhookService.constructEvent(payload, signature);

    switch (event.type) {
      case "checkout.session.completed":
        console.log("✅ Checkout session completed:", event.data.object);
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