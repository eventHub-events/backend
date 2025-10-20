import { z } from "zod";

// ✅ Updated regex patterns
const nameRegex = /^[A-Z][a-zA-Z\s]*$/;  // Start with capital, allow spaces
const descriptionRegex = /^[A-Z][a-zA-Z\s,\\-]*\.?$/; // Start with capital, allow letters, spaces, commas
const tagRegex = /^[A-Za-z\s]+$/; // Allow letters and spaces

export const categoryValidateSchema = z.object({
  name: z
    .string()
    .min(3, "Category name must be at least 3 characters")
    .max(50, "Category name must not exceed 50 characters")
    .regex(
      nameRegex,
      "Category name must start with a capital letter and contain only letters and spaces"
    ),

  color: z
    .string()
    .min(3, "Color must be at least 3 characters")
    .max(15, "Color must be at most 15 characters")
    .regex(
      /^[A-Za-z0-9#@!$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/,
      "Color can contain letters, numbers, and special characters"
    ),

  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(200, "Description must be at most 200 characters")
    .regex(
      descriptionRegex,
      "Description must start with a capital letter and contain only letters, commas, and spaces"
    )
    .optional(),

  tags: z
    .array(
      z
        .string()
        .min(3, "Each tag must be at least 3 characters")
        .max(15, "Each tag must be at most 15 characters")
        .regex(tagRegex, "Tags can contain only letters and spaces")
    )
    .min(1, "At least one tag is required"),

  isBlocked: z.boolean().optional(),
});

export type categoryValidateSchemaType = z.infer<typeof categoryValidateSchema>;

// For update validation (partial fields)
export const categoryValidateUpdateSchema = categoryValidateSchema.partial();
