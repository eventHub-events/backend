import { z } from 'zod';

const nameRegex = /^[A-Z][a-zA-Z]*(?: [A-Z][a-zA-Z]*){0,2}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9]{10}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,16}$/;

export enum UserRole {
  User = 'user',
  Organizer = 'organizer',
}

export const userRegisterSchema = z.object({
  name: z
    .string()
    .max(15, 'Name must be at most 15 characters')
    .regex(
      nameRegex,
      'Only letters allowed, each word must start with a capital letter, spaces allowed only between words'
    ),

  email: z.string().regex(emailRegex, 'A valid email address is required'),

  phone: z
    .string()
    .regex(phoneRegex, 'Phone must be exactly 10 digits')
    .transform(val => Number(val)),

  password: z
    .string()
    .regex(
      passwordRegex,
      'Password must be 8–16 characters and include 1 uppercase, 1 lowercase, 1 number, and 1 special character'
    ),

  role: z.enum(['user', 'organizer']),
});

export type UserRegisterSchemaType = z.infer<typeof userRegisterSchema>;
