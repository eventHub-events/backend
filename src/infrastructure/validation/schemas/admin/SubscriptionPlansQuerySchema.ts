import { z } from 'zod';

export const SubscriptionPlansQuerySchema = z.object({
  page: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),

  name: z.string().optional().nullable(),

  from: z.preprocess(
    v => (v === '' ? undefined : v),
    z.string().datetime().optional()
  ),

  to: z.preprocess(
    v => (v === '' ? undefined : v),
    z.string().datetime().optional()
  ),
});

export type SubscriptionPlansQueryDTO = z.infer<
  typeof SubscriptionPlansQuerySchema
>;
