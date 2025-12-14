import { z } from "zod";
import { BookingStatus, PaymentMethod, RefundStatus } from "../../../../domain/enums/user/Booking";


export const EventAnalyticsQuerySchema = z.object({
  eventId: z.string().min(1, "eventId is required"),

  from: z.coerce.date().optional(),
  to: z.coerce.date().optional(),

  bookingStatus: z.nativeEnum(BookingStatus).optional(),

  paymentMethod: z.nativeEnum(PaymentMethod).optional(),

  refundStatus: z.nativeEnum(RefundStatus).optional(),

  search: z.string().min(1).optional(),
});
