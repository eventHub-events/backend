import { z} from "zod"
 
const nameRegex = /^[A-Z][a-zA-Z]{0,14}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9]{10}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,16}$/;
export enum UserRole {
    User= "user",
    Organizer = "organizer"
}
export const userRegisterSchema = z.object({
   name: z.string().regex(nameRegex, "Name must start with a capital letter, contain only letters, and be max 15 characters"),
   email: z.string().regex(emailRegex,"A valid email address is required"),
   phone: z.string()
      .regex(phoneRegex, "Phone must be exactly 10 digits")
      .transform((val) => Number(val)),
   password: z.string().regex(passwordRegex, 'Password must be 8–16 characters and include 1 uppercase, 1 lowercase, 1 number, and 1 special character'),
   role: z
    .enum(["user", "organizer"])
    .refine((val) => ["user", "organizer"].includes(val), {
      message: "Role must be either 'user' or 'organizer'",
     }),


})

export type UserRegisterSchemaType = z.infer<typeof userRegisterSchema>;