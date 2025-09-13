import { UpdatedUploadDocumentResponseDTO } from "../../../domain/dtos/admin/UpdatedUploadedDocumentDTO";
import { UploadDocumentResponseDTO } from "../../../domain/dtos/admin/UploadDocumentResponseDTO";
import { UploadDocument } from "../../../infrastructure/db/models/organizer/profile/UploadDocument";
import { IOrganizerUploadDocumentMapper } from "../../interface/admin/IOrganizerUploadDocumentMapper";


export class OrganizerUploadDocumentMapper implements IOrganizerUploadDocumentMapper {

 toResponse(UploadDocument:UploadDocument):UploadDocumentResponseDTO{

  return {
    organizerId:UploadDocument.organizerId.toString(),
    name:UploadDocument.name,
    type:UploadDocument.type,
    url:UploadDocument.url,
    uploadedAt:UploadDocument.uploadedAt,
    status:UploadDocument.status,
    verified:UploadDocument.verified,
    
  }
}
   toResponseToAdmin(UploadDocument:UploadDocument):UpdatedUploadDocumentResponseDTO{
   return{
    organizerId:UploadDocument.organizerId.toString(),
    name:UploadDocument.name,
    type:UploadDocument.type,
    url:UploadDocument.url,
    uploadedAt:UploadDocument.uploadedAt,
    status:UploadDocument.status,
    verified:UploadDocument.verified,
     reviewedBy:UploadDocument.reviewedBy,
  reviewedAt:UploadDocument.reviewedAt,
reason:UploadDocument.reason

   }  
   }
} 