export interface UploadDocumentResponseDTO{
    organizerId:string;
  name:string;
  type:string;
  url:string;
  uploadedAt:Date;
  status:"Pending"|"Approved"|"Rejected";
  verified:boolean;
}