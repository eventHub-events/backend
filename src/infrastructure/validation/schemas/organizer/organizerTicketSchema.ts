import { z } from 'zod';

const nameRegex = /^[A-Z][a-zA-Z\s,]{2,}$/;
// const priceRegex = /^[0-9]+$/;
const descriptionRegex = /^[A-Z][a-zA-Z, ]{4,79}$/;

export const ticketTierSchema = z.object({
  name: z
    .string()
    .regex(
      nameRegex,
      'TicketName must contain letters only and FirstLetter should be capital'
    )
    .min(3, { message: 'Ticket name must be at least 3 characters' }),
  price: z
    .union([z.string(), z.number()])
    .refine(
      val => {
        const num = Number(val);
        return /^[0-9]+$/.test(String(val)) && num >= 1 && num <= 6000;
      },
      { message: 'Price must be a number between 1 and 6000' }
    )
    .transform(val => Number(val)),
  totalSeats: z
    .union([z.string(), z.number()])
    .refine(
      val => {
        const num = Number(val);
        return !isNaN(num) && num >= 5 && num <= 600;
      },
      { message: 'Total seats must be between 5 and 600' }
    )
    .transform(val => Number(val)),
  description: z
    .string()
    .regex(descriptionRegex, {
      message:
        'Description must start with capital letter and contain only letters',
    })
    .min(5, { message: 'Description must be at least 5 letters ' })
    .max(80, { message: 'Description shall not be more than 50 letters' })
    .optional(),

  benefits: z
    .union([
      z
        .string()
        .regex(
          /^[A-Za-z\s,]+$/,
          'Benefit can contain only letters, commas, and spaces'
        ),
      z.array(
        z
          .string()
          .regex(
            /^[A-Za-z\s,]+$/,
            'Benefit can contain only letters, commas, and spaces'
          )
      ),
    ])
    .optional()
    .transform(val => {
      if (typeof val === 'string') return [val];
      return val ?? [];
    }),

  maxTicketPerUser: z.coerce
    .number()
    .min(1, { message: 'Each user must be allowed at least one ticket' })
    .max(20, { message: 'A user cannot buy more than 20 tickets per tier' })
    .optional(),

  isRefundable: z.boolean().default(false),
});
export const organizerTicketSchema = z.object({
  eventId: z.string(),
  organizerId: z.string(),
  tickets: z
    .array(ticketTierSchema)
    .min(1, { message: 'At least one ticket tier is required' }),

  saleStartDate: z.coerce.date(),
  saleEndDate: z.coerce.date(),
  waitingListEnabled: z.boolean().default(false),
});

export type OrganizerTicketSchema = z.infer<typeof organizerTicketSchema>;
export const organizerTicketUpdateSchema = organizerTicketSchema.partial();
