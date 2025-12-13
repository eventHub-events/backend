import Stripe from 'stripe';
import { IStripeWebhookService } from '../../../application/service/common/IStripeWebhookService';
import dotenv from 'dotenv';
dotenv.config();

export class StripeWebhookService implements IStripeWebhookService {
  private stripe: Stripe;

  constructor(secretKey: string) {
    this.stripe = new Stripe(secretKey, { apiVersion: '2025-10-29.clover' });
  }

  constructEvent(payload: Buffer, signature: string): Stripe.Event {
    return this.stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  }
}
