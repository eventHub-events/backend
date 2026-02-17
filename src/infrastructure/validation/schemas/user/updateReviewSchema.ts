import { z } from "zod";

export const updateReviewSchema = z.object({
  rating: z.coerce
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot exceed 5"),

  review: z
    .string()
    .trim()
    .min(10, "Review must be at least 10 characters")
    .max(500, "Review too long")
    .refine((val) => /^[A-Za-z]/.test(val), {
      message: "Review must start with a letter",
    }),
});
