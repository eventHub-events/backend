import { z } from 'zod';

const nameRegex = /^[A-Z][a-zA-Z]{0,14}$/;
const phoneRegex = /^[0-9]{10}$/;
const addressRegex = /^[A-Z][A-Za-z0-9\s,]{0,34}$/;
const cityStateCountryRegex = /^[A-Z][a-zA-Z]{0,14}$/;
const pinRegex = /^[0-9]{6}$/;

const addressSchema = z.object({
  line1: z
    .string()
    .regex(addressRegex, 'Must start with capital, max 35 characters')
    .optional(),
  line2: z
    .string()
    .regex(addressRegex, 'Must start with capital, max 35 characters')
    .optional(),
  city: z
    .string()
    .regex(cityStateCountryRegex, 'Invalid city format')
    .optional(),
  state: z
    .string()
    .regex(cityStateCountryRegex, 'Invalid state format')
    .optional(),
  country: z
    .string()
    .regex(cityStateCountryRegex, 'Invalid country format')
    .optional(),
  pin: z.string().regex(pinRegex, 'PIN Code must be 6 digits').optional(),
});

export const userProfileUpdateSchema = z.object({
  user: z
    .object({
      name: z.string().regex(nameRegex, 'Invalid name').optional(),
      email: z.string().email().optional(),
      phone: z.string().regex(phoneRegex, 'Phone must be 10 digits').optional(),
      userId: z.string().min(1, 'userId is required').optional(),
    })
    .optional(),
  profile: z
    .object({
      address: addressSchema.optional(),
      image: z.string().optional(),
      memberSince: z.string().optional(),
      twoFAEnabled: z.boolean().optional(),
      favorites: z.array(z.string()).optional(),
    })
    .optional(),
});

export type UserProfileUpdateSchemaType = z.infer<
  typeof userProfileUpdateSchema
>;
