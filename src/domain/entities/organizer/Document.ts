export interface UploadDocument{
  id?:string;
  organizerId:string;
  name:string;
  type:string;
  url:string;
  uploadedAt:Date;
  verified:boolean;
  reviewedBy?:string;
  reviewedAt?:Date;
  reason?:string;
  status:"Pending"|"Approved" |"Rejected";
}
