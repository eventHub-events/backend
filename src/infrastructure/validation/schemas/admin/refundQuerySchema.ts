import { z } from 'zod';

export const RefundQuerySchema = z.object({
  page: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),

  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),

  status: z
    .enum(['pending', 'failed', 'succeeded', 'none', ''])
    .default('none')
    .optional(),

  eventTitle: z.string().optional(),
  organizerName: z.string().optional(),
  paymentMethod: z.string().optional(),
  userName: z.string().optional(),
});
