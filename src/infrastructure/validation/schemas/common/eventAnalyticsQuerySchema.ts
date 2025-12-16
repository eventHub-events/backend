import { z } from 'zod';
import {
  BookingStatus,
  RefundStatus,
} from '../../../../domain/enums/user/Booking';

export const EventAnalyticsQuerySchema = z.object({
  eventId: z.string().min(1, 'eventId is required'),

  from: z.coerce.date().optional(),
  to: z.coerce.date().optional(),

  bookingStatus: z.nativeEnum(BookingStatus).optional(),

  paymentMethod: z
    .string()
    .transform(v => v.toLowerCase())
    .pipe(z.enum(['card', 'upi']))
    .optional(),
  refundStatus: z.nativeEnum(RefundStatus).optional(),

  search: z
    .string()
    .optional()
    .transform(v => (v?.trim() === '' ? undefined : v)),
});
