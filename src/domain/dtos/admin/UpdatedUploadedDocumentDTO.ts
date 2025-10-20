import { DocumentStatus } from "../../enums/organizer/documentStatus";

export interface UpdatedUploadDocumentResponseDTO{
 organizerId:string;
  name:string;
  type:string;
  url:string;
  uploadedAt?:Date;
  status?:DocumentStatus;
  verified?:boolean;
   reviewedBy?:string;
  reviewedAt?:Date;
  reason?:string
  
}