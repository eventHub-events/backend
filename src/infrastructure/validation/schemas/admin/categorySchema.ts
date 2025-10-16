import  { z } from "zod";



const capitalStartRegex = /^[A-Z][a-zA-Z]*$/;
const descriptionRegex = /^[A-Z][a-zA-Z\s]*$/;
const tagRegex = /^[A-Za-z,\s]+$/;


 export const categoryValidateSchema = z.object({
    name: z.string().min(3,"Category must be at least  3 characters").max(50, "Category shall not be more than 50 characters").
            regex(capitalStartRegex, "Category name must start with a capital letter and contain  only letters"),

   color: z
    .string()
    .min(3, "Color must be at least 3 characters")
    .max(15, "Color must be at most 15 characters")
    .regex(
      /^[A-Za-z0-9#@!$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/,
      "Color can contain letters, numbers, and special characters"
    ),
    description: z.string()
          .min(20, "Description must be at least 50 characters")
          .max(100, "Description  must be at most 200 characters")
          .regex(descriptionRegex, "Description must start  with a capital letter and contain only  letters and spaces")
          .optional(),
    tags: z.array(
           z.string()
             .min(3,"Each tag must be at least 3 characters")
             .max(15, "Each tag must be at most 15  characters")
             .regex(tagRegex, "Tags can contain only letters")
       )
       .min(1,  "At least one tag is required"),
    isBlocked: z.boolean()

 })

 export  type categoryValidateSchemaType =  z.infer<typeof categoryValidateSchema>;
 export const  categoryValidateUpdateSchema = categoryValidateSchema.partial()