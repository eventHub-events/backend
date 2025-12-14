//

import { DocumentStatus } from '../../../domain/enums/organizer/documentStatus';

export interface UploadDocumentResponseDTO {
  id?: string;
  organizerId: string;
  name: string;
  type: string;
  // url: string;
  cloudinaryPublicId: string;
  uploadedAt?: Date;
  status?: DocumentStatus;
  verified?: boolean;
  reason?: string;
  reviewedAt?: Date;
  reviewedBy?: string;
}
