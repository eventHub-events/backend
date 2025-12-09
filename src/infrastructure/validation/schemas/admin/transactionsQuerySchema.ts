import { z } from "zod";
import { ErrorMessages } from "../../../../constants/errorMessages";

export const TransactionsQuerySchema  = z.object({
   page: z
    .string()
    .regex(/^\d+$/)
    .transform(Number)
    .pipe(z.number().min(1)).optional(),

  limit: z
    .string()
    .regex(/^\d+$/)
    .transform(Number)
    .pipe(z.number().min(1).max(100)).optional(),

  from: z
    .string()
    .optional()
    .refine((v) => !v || !isNaN(Date.parse(v)), ErrorMessages.TRANSACTIONS_QUERY_SCHEMA.FROM_DATE_ERROR)
    .transform((v) => (v ? new Date(v) : undefined)).optional(),

  to: z
    .string()
    .optional()
    .refine((v) => !v || !isNaN(Date.parse(v)), ErrorMessages.TRANSACTIONS_QUERY_SCHEMA.TO_DATE_ERROR)
    .transform((v) => (v ? new Date(v) : undefined)).optional(),

  status: z.string().optional(),

  eventTitle: z.string().optional(),

  organizerName: z.string().optional(),
  userName: z.string().optional()
})