export interface UpdatedUploadDocumentResponseDTO{
 organizerId:string;
  name:string;
  type:string;
  url:string;
  uploadedAt?:Date;
  status?:"Pending"|"Approved"|"Rejected";
  verified?:boolean;
   reviewedBy?:string;
  reviewedAt?:Date;
  reason?:string
  
}