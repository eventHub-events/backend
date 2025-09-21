import { UpdatedUploadDocumentResponseDTO } from "../../../domain/dtos/admin/UpdatedUploadedDocumentDTO";
import { UploadDocumentResponseDTO } from "../../../domain/dtos/admin/UploadDocumentResponseDTO";
import { UploadDocumentDTO } from "../../../domain/dtos/organizer/DocumentDTO";
import { UploadDocument } from "../../../domain/entities/organizer/Document";

import { IOrganizerUploadDocumentMapper } from "../../interface/admin/IOrganizerUploadDocumentMapper";


export class OrganizerUploadDocumentMapper implements IOrganizerUploadDocumentMapper {

 toResponse( UploadDocument: UploadDocument ): UploadDocumentResponseDTO {

  return {
    organizerId  :   UploadDocument.organizerId.toString(),
    id           :   UploadDocument.id?.toString(),
    name         :   UploadDocument.fileName,
    type         :   UploadDocument.type,
    url          :   UploadDocument.url,
    uploadedAt   :   UploadDocument.uploadedAt,
    status       :   UploadDocument.status,
    verified     :   UploadDocument.verified,
    reason       :   UploadDocument.reason,
    reviewedAt   :   UploadDocument.reviewedAt,
    reviewedBy   :    UploadDocument.reviewedBy

    
  }
}
   toResponseToAdmin( UploadDocument: UploadDocument): UpdatedUploadDocumentResponseDTO {
   return{
    organizerId  :  UploadDocument.organizerId.toString(),
    name         :  UploadDocument.fileName,
    type         :  UploadDocument.type,
    url          :  UploadDocument.url,
    uploadedAt   :  UploadDocument.uploadedAt,
    status       :  UploadDocument.status,
    verified     :  UploadDocument.verified,
    reviewedBy   :  UploadDocument.reviewedBy,
    reviewedAt   :  UploadDocument.reviewedAt,
    reason       :  UploadDocument.reason

   }  

  
   }

    toEntity( dto: UploadDocumentDTO) : UploadDocument {
      return {
        organizerId : dto.organizerId ,
        fileName    : dto .name ,
        type        : dto.type,
        url         : dto. url,
       uploadedAt   : new Date()
      }

   }
} 