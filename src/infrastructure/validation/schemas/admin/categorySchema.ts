import  { z } from "zod";



const onlyLettersRegex = /^[A-Za-z]+$/;
const capitalStartRegex = /^[A-Z][a-zA-Z]*$/;
const descriptionRegex = /^[A-Z][a-zA-Z\s]*$/;


 export const categoryValidateSchema = z.object({
    name: z.string().min(3,"Category must be at least  3 characters").max(50, "Category shall not be more than 50 characters").
            regex(capitalStartRegex, "Category name must start with a capital letter and contain  only letters"),

    color: z.string()
          .min(3," Color Must be at least 3 characters")
          .max(15,"Color must be at most 15 characters")
          .regex(capitalStartRegex,  "Color must start  with a capital letter and contain  only  letter"),
    description: z.string()
          .min(50, "Description must be at least 50 characters")
          .max(200, "Description  must be at most 200 characters")
          .regex(descriptionRegex, "Description must start  with a capital letter and contain only  letters and spaces")
          .optional(),
    tags: z.array(
           z.string()
             .min(3,"Each tag must be at least 3 characters")
             .max(15, "Each tag must be at most 15  characters")
             .regex(onlyLettersRegex, "Tags can contain only letters")
       )
       .min(1,  "At least one tag is required")

 })

 export  type categoryValidateSchemaType =  z.infer<typeof categoryValidateSchema>;
 export const  categoryValidateUpdateSchema = categoryValidateSchema.partial()