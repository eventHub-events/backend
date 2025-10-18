
import { UserWithDocumentsResponseDTO } from "../../../domain/DTOs/admin/UserWithDocumentsResponseDTO";
import { UploadDocument } from "../../../domain/entities/organizer/Document";
import { User } from "../../../domain/entities/User";


export interface IUploadDocumentsMapper {
  toResponse( documentData : UploadDocument[], userData: User ): UserWithDocumentsResponseDTO;

}