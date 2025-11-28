import { DocumentStatus } from "../../../domain/enums/organizer/documentStatus";

export interface UploadDocumentUpdateDTO{
  status:DocumentStatus
  verified:boolean;
  reviewedBy:string;
  reviewedAt:Date;
  reason?:string

}