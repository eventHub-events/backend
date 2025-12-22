import { z } from 'zod';
import { BookingStatus } from '../../../../domain/enums/user/Booking';

export const bookingQuerySchema = z.object({
  title: z.string().optional(),
  userName: z.string().optional(),
  organizerName:z.string().optional(),
eventTitle:z.string().optional(),
  status: z.preprocess(
    val => (val === '' ? undefined : val),
    z.nativeEnum(BookingStatus).optional()
  ),

  startDate: z.string().optional(),
  endDate: z.string().optional(),

  page: z
    .string()
    .optional()
    .transform(val => (val ? parseInt(val, 10) : 1)),

  limit: z
    .string()
    .optional()
    .transform(val => (val ? parseInt(val, 10) : 10)),
});

export type BookingQueryFilter = z.infer<typeof bookingQuerySchema>;
