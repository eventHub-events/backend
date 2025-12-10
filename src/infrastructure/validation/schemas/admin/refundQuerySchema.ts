import { z } from "zod";
import { RefundStatus } from "../../../../domain/enums/user/Booking";

export const RefundQuerySchema = z.object({
  page: z.string().optional().transform(Number).optional(),
  limit: z.string().optional().transform(Number).optional(),

  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),

  status: z.enum([RefundStatus.PENDING, RefundStatus.FAILED,RefundStatus.SUCCEEDED,RefundStatus.NONE]).optional(),
  eventTitle: z.string().optional(),
  organizerName: z.string().optional(),
  paymentMethod: z.string().optional(),
  userName: z.string().optional(),
});
