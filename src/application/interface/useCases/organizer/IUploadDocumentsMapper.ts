import { UserWithDocumentsResponseDTO } from '../../../DTOs/admin/UserWithDocumentsResponseDTO';
import { UploadDocument } from '../../../../domain/entities/organizer/Document';
import { User } from '../../../../domain/entities/User';

export interface IUploadDocumentsMapper {
  toResponse(
    documentData: UploadDocument[],
    userData: User
  ): UserWithDocumentsResponseDTO;
}
