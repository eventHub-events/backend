import { z } from "zod";
import { PayoutStatus } from "../../../../domain/enums/user/Booking";

export const PayoutQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),

  from: z.string().optional(),
  to: z.string().optional(),

  status: z.enum(Object.values(PayoutStatus)).optional(),
  organizerName: z.string().optional(),
  eventTitle: z.string().optional(),
  paymentMethod: z.string().optional(),
});
