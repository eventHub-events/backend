import { z } from "zod";

export const SubscriptionOverviewQuerySchema = z.object({
  from: z.preprocess((val) => val === "" ? undefined : val, z.coerce.date().optional()),
to: z.preprocess((val) => val === "" ? undefined : val, z.coerce.date().optional()),

});

export type SubscriptionOverviewQueryDTO = z.infer<typeof SubscriptionOverviewQuerySchema>;
