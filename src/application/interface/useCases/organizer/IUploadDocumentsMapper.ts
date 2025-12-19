import { UserWithDocumentsResponseDTO } from '../../../DTOs/admin/UserWithDocumentsResponseDTO';
import { UploadDocument } from '../../../../domain/entities/organizer/Document';
import { UserEntity } from '../../../../domain/entities/User';

export interface IUploadDocumentsMapper {
  toResponse(
    documentData: UploadDocument[],
    userData: UserEntity
  ): UserWithDocumentsResponseDTO;
}
