import Stripe from "stripe";
import { IStripePaymentService } from "../../../../application/service/common/IStripePaymentService";
import { BookingCheckoutDTO } from "../../../../application/DTOs/user/payment/BookingCheckoutDTO";

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
    payoutDelayDays: number;
    commissionRate: number;
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
    payoutDelayDays: number
    planId: string;
    commissionRate: number;
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
    payoutDelayDays: number
    planId: string;
    paymentType: string;
    commissionRate: number;
  }): Promise<string> {
    const {
      planName,
      price,
      organizerId,
      durationInDays,
      organizerName,
      organizerEmail,
      planId,
      payoutDelayDays,
      paymentType,
      commissionRate
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
        price,
        organizerEmail,
        organizerName,
        paymentType,
        payoutDelayDays,
        commissionRate
      },
    };

    const session = await this.stripe.checkout.sessions.create(params);
    return session.url!;
  }

  async createBookingCheckout(dto :BookingCheckoutDTO ): Promise<string> {
     console.log("bookingid in ddddddd", dto.bookingId)
      const session = await this.stripe.checkout.sessions.create({
           mode: "payment",
           payment_method_types:["card"],
            line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: { name: dto.eventTitle },
          unit_amount: dto.totalAmount * 100,
        },
        quantity: 1,
      },
    ],
       payment_intent_data: {
      // ⚠️ No `transfer_data` here — funds stay with admin (platform)
       // optional; remove if you don’t take fees at this step
    },
    success_url: `http://localhost:3000/user/make-payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `http://localhost:3000/user/make-payment/cancel`,
    metadata: {
      paymentType: "ticket",
      bookingId: dto.bookingId,
      organizerId: dto.organizerId,
      userId: dto.userId,
      organizerStripeId: dto.organizerStripeId!, // store it for later payout
    },
      });
    return session.url!
  }
 async refundPayment(paymentIntentId: string): Promise<void> {
    await this.stripe.refunds.create({
        payment_intent : paymentIntentId
    })
 }
}
