import Stripe from "stripe"
import { Buffer } from "buffer";

export interface IStripeWebhookService {
  constructEvent(payload: Buffer, signature: string): Stripe.Event;
}