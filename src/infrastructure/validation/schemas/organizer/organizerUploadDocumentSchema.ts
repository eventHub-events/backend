import { z } from 'zod';
import { DocumentStatus } from '../../../../domain/enums/organizer/documentStatus';

export const documentTypes = [
  'AadharCard',
  'PANCard',
  'BusinessCertificate',
] as const;

export const organizerUploadDocumentSchema = z.object({
  name: z.string().min(2, 'Document file name must be at least 2 characters'),

  cloudinaryPublicId: z
    .string()
    .min(1, 'cloudinaryPublicId is required')
    .refine(val => !val.startsWith('http'), {
      message: 'cloudinaryPublicId must not be a URL',
    }),

  type: z.enum(documentTypes, {
    message: 'Invalid Document type',
  }),

  organizerId: z.string().min(1, 'organizerId is required'),

  status: z.enum(DocumentStatus).optional(),
});

export type OrganizerUploadDocumentSchemaType = z.infer<
  typeof organizerUploadDocumentSchema
>;

export const organizerUploadDocumentUpdateSchema =
  organizerUploadDocumentSchema.partial();

export type OrganizerUploadDocumentUpdateSchemaType = z.infer<
  typeof organizerUploadDocumentUpdateSchema
>;
