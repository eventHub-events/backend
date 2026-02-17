import { z } from "zod";
export const userReviewSchema = z.object({
   rating: z.coerce.number().min(1).max(5), 
  review : z.string()
        .min(10,"Review must be at least 10 characters")
        .max(500,"Review too long")
        .refine((val) => /^[A-Za-z]/.test(val.trim()), {
      message: "Review must start with a letter",
    }),
    userId: z.string(),
  targetId: z.string(),
  userName: z
    .string()
    .trim()
    .min(2, "User name too short")
    .max(50, "User name too long"),

  targetType: z.enum(["event", "organizer"], {
    message: "Invalid target type",
  }),
})