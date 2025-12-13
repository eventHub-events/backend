import { DocumentStatus } from '../../../domain/enums/organizer/documentStatus';

export interface UpdateDocumentRequestDTO {
  url?: string;
  status?: DocumentStatus;
}
