import { UserWithDocumentsResponseDTO } from '../../DTOs/admin/UserWithDocumentsResponseDTO';
import { UploadDocument } from '../../../domain/entities/organizer/Document';
import { UserEntity } from '../../../domain/entities/User';
import { IOrganizerUploadDocumentMapper } from '../../interface/useCases/admin/IOrganizerUploadDocumentMapper';
import { IUploadDocumentsMapper } from '../../interface/useCases/organizer/IUploadDocumentsMapper';

export class UploadDocumentsMapper implements IUploadDocumentsMapper {
  constructor(private _documentMapper: IOrganizerUploadDocumentMapper) {}

  toResponse(
    documentData: UploadDocument[],
    userData: UserEntity
  ): UserWithDocumentsResponseDTO {
    const userDocs = documentData.map(doc =>
      this._documentMapper.toResponse(doc)
    );
    return {
      id: userData.id,
      name: userData.name,
      isVerified: userData.isVerified,
      kycStatus: userData.kycStatus!,
      isKycResubmitted: userData.isKycResubmitted,
      documents: userDocs,
    };
  }
}
