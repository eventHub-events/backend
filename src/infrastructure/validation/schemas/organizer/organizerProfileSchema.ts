import { z } from 'zod';

const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const organizerProfileSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name is required' })
    .max(15, { message: 'Name must be at most 15 characters' })
    .regex(nameRegex, {
      message: 'Name can only contain letters and single space between words',
    })
    .optional(),
  email: z
    .string()
    .regex(emailRegex, { message: 'A valid email address is required' })
    .optional(),
  phone: z
    .union([
      z.string().regex(/^\d{10}$/, 'Phone must be 10 digits'),
      z.number(),
    ])
    .optional()
    .transform(val => {
      // Always return number
      if (typeof val === 'string') return Number(val);
      return val;
    }),

  location: z
    .string()
    .max(30, 'Location must be at most 30 characters')
    .optional(),

  organization: z
    .string()
    .max(30, 'Organization name must be at most 30 characters')
    .regex(/^[A-Z][a-zA-Z\s]*$/, {
      message:
        'Organization must start with a capital letter and contain only letters/spaces',
    })
    .optional(),

  website: z
    .string()
    .url({ message: 'Must be a valid URL' })
    .max(100, 'Website URL must be at most 100 characters')
    .optional(),

  profilePicture: z
    .string()
    .refine(
      val => val === '' || /^https?:\/\/.+\.(jpg|jpeg|png|webp)$/i.test(val),
      {
        message:
          'Must be an empty string or a valid image URL ending in .jpg, .jpeg, .png, or .webp',
      }
    )
    .optional(),

  bio: z
    .string()
    .min(10, { message: 'Bio must be at least 10 characters' })
    .max(500, { message: 'Bio must be at most 500 characters' })
    .refine(val => /\S/.test(val), {
      message: 'Bio cannot be just whitespace',
    })
    .optional(),

  organizerId: z
    .string()
    .regex(/^[a-f\d]{24}$/i, { message: 'Invalid Organizer ID format' })
    .optional(),
  trustScore: z.coerce.number().min(0).optional(),

  kycVerified: z.boolean().optional(),

  totalEarnings: z.coerce.number().min(0).optional(),
});

export type OrganizerProfileSchemaType = z.infer<typeof organizerProfileSchema>;
