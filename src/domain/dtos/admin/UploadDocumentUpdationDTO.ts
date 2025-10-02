import { DocumentStatus } from "../../enums/organizer/documentStatus";

export interface UploadDocumentUpdateDTO{
  status:DocumentStatus
  verified:boolean;
  reviewedBy:string;
  reviewedAt:Date;
  reason?:string

}