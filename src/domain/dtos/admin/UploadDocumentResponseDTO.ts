import { DocumentStatus } from "../../enums/organizer/documentstatus";

export interface UploadDocumentResponseDTO {
  organizerId: string;
  name: string;
  type: string;
  url: string;
  uploadedAt?: Date;
  status?: DocumentStatus;
  verified?: boolean;
}
