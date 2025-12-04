import { z } from "zod";
import { BookingStatus } from "../../../../domain/enums/user/Booking";


export const bookingQuerySchema = z.object({
  title: z.string().optional(),
  userName: z.string().optional(),

  status: z
    .enum([
      BookingStatus.CONFIRMED,
      BookingStatus.CANCELLED,
      BookingStatus.EXPIRED,
      BookingStatus.PENDING_PAYMENT,
      BookingStatus.PAYMENT_FAILED,
      BookingStatus.REFUNDED
    ])
    .optional().or(z.literal("")),

  startDate: z.string().optional(),
  endDate: z.string().optional(),

  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 1)),

  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 10)),
});

export type BookingQueryFilter = z.infer<typeof bookingQuerySchema>;
