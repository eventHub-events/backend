import Stripe from "stripe";
import { IStripePaymentService } from "../../../../application/service/common/IStripePaymentService";

export class StripePaymentService implements IStripePaymentService {
  private stripe: Stripe;

  constructor(secretKey: string) {
    this.stripe = new Stripe(secretKey);
  }

  async createSubscriptionCheckout(data: {
    planName: string;
    price: number;
    organizerId: string;
    durationInDays: number;
    organizerName: string;
    organizerEmail: string;
    planId: string;
  }): Promise<string> {
    return this.createCheckoutSession({
      ...data,
      paymentType: "subscription",
    });
  }

  async createUpgradeSubscriptionCheckout(data: {
    planName: string;
    price: number;
    organizerId: string;
    durationInDays: number;
    organizerName: string;
    organizerEmail: string;
    planId: string;
  }): Promise<string> {
    return this.createCheckoutSession({
      ...data,
      paymentType: "subscription-upgrade",
    });
  }

  // ✅ Private helper for DRY code
  private async createCheckoutSession(data: {
    planName: string;
    price: number;
    organizerId: string;
    durationInDays: number;
    organizerName: string;
    organizerEmail: string;
    planId: string;
    paymentType: string;
  }): Promise<string> {
    const {
      planName,
      price,
      organizerId,
      durationInDays,
      organizerName,
      organizerEmail,
      planId,
      paymentType,
    } = data;

    const params: Stripe.Checkout.SessionCreateParams = {
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: { name: planName },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `http://localhost:3000/organizer/subscription-plans/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/organizer/subscription-plans/cancel`,
      metadata: {
        organizerId,
        planId,
        durationInDays,
        planName,
        organizerEmail,
        organizerName,
        paymentType,
      },
    };

    const session = await this.stripe.checkout.sessions.create(params);
    return session.url!;
  }
}
