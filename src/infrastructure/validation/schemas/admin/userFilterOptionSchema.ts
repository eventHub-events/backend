import { z } from 'zod';

export const UserFilterOptionsSchema = z.object({
  page: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
  search: z.string().optional(),
  role: z.string().optional(),
  status: z.string().optional(),
});

export type UserFilterOptions = z.infer<typeof UserFilterOptionsSchema>;
