import { UploadDocumentResponseDTO } from "../../../domain/dtos/admin/UploadDocumentResponseDTO";
import { UploadDocument } from "../../../infrastructure/db/models/organizer/profile/UploadDocument";


export class OrganizerUploadDocumentMapper {

static toResponse(UploadDocument:UploadDocument):UploadDocumentResponseDTO{

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
} 