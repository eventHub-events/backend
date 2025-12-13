import { z } from 'zod';

export const EventRevenueFilterSchema = z.object({
  page: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
  eventTitle: z.string().optional(),
  organizerName: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
});
