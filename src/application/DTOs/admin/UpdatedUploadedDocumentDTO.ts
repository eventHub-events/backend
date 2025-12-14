import { DocumentStatus } from '../../../domain/enums/organizer/documentStatus';

export interface UpdatedUploadDocumentResponseDTO {
  organizerId: string;
  name: string;
  type: string;
  // url: string;
  cloudinaryPublicId: string;
  uploadedAt?: Date;
  status?: DocumentStatus;
  verified?: boolean;
  reviewedBy?: string;
  reviewedAt?: Date;
  reason?: string;
}
