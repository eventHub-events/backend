import Stripe from 'stripe';
import { ProcessPayoutUseCase } from '../../../application/useCases/organizer/payout/processPayoutUseCase';
import { BookingEntityFactory } from '../../../infrastructure/factories/user/BookingEntityFactory';
import { BookingRepository } from '../../../infrastructure/repositories/user/booking/BookingRepository';
import dotenv from 'dotenv';
import { PayoutSchedulerJob } from '../../../infrastructure/jobs/PayoutSchedulerJob';
dotenv.config();
const bookingEntityFactory = new BookingEntityFactory();
const bookingRepository = new BookingRepository(bookingEntityFactory);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-10-29.clover',
});
const processPayoutUseCase = new ProcessPayoutUseCase(
  bookingRepository,
  stripe
);
export const payoutSchedulerJob = new PayoutSchedulerJob(
  undefined,
  processPayoutUseCase
);
