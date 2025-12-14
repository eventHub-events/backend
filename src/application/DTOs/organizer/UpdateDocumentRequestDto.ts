import { DocumentStatus } from '../../../domain/enums/organizer/documentStatus';

export interface UpdateDocumentRequestDTO {
  cloudinaryPublicId?: string;
  status?: DocumentStatus;
}
