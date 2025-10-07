import { UploadDocumentResponseDTO } from "../../../domain/dtos/admin/UploadDocumentResponseDTO";
import { UserWithDocumentsResponseDTO } from "../../../domain/dtos/admin/UserWithDocumentsResponseDTO";
import { UploadDocument } from "../../../domain/entities/organizer/Document";
import { User } from "../../../domain/entities/User";


export interface IUploadDocumentsMapper {
  toResponse( documentData : UploadDocument[], userData: User ): UserWithDocumentsResponseDTO;

}