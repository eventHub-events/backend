export interface UploadDocumentUpdateDTO{
  status:"Pending"|"Approved" |"Rejected";
  verified:boolean;
  reviewedBy:string;
  reviewedAt:Date;
  reason?:string

}