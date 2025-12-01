import { z } from "zod";

export const EventSearchQuerySchema = z.object({
  search: z.string().optional(),
  title: z.string().optional(),
  location: z.string().optional(),
  category: z.string().optional(),
  organizer: z.string().optional(),

  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(6),
});