import { UpdateOrganizerOverallVerificationStatusDTO } from '../../../DTOs/admin/OrganizerOverallVerificationDTO';
import { OrganizerVerificationResponseDTO } from '../../../DTOs/admin/OrganizerVerificationResponseDTO';
import { UpdatedUploadDocumentResponseDTO } from '../../../DTOs/admin/UpdatedUploadedDocumentDTO';
import { UploadDocumentUpdateDTO } from '../../../DTOs/admin/UploadDocumentUpdateDTO';
import { CompleteOrganizerDetailResponseDTO } from '../../../DTOs/admin/UserWithOrganizerProfileDTO';
import { UploadDocument } from '../../../../domain/entities/organizer/Document';
import { OrganizerProfile } from '../../../../domain/entities/organizer/OrganizerProfile';
import { User } from '../../../../domain/entities/User';
import { OrganizerProfileWithUser } from '../../../../domain/types/OrganizerTypes';

export interface IOrganizerVerificationMapper {
  toResponse(
    profile: OrganizerProfile,
    user: User,
    Docs: UploadDocument[]
  ): OrganizerVerificationResponseDTO;
  toOrganizerDetailsResponse(
    organizerData: OrganizerProfileWithUser[]
  ): CompleteOrganizerDetailResponseDTO[];
  toResponseAfterUpdate(
    documentData: UploadDocument
  ): UpdatedUploadDocumentResponseDTO;
  toDomainForOverallVerification(
    data: UpdateOrganizerOverallVerificationStatusDTO
  ): { user: Partial<User>; profile: Partial<OrganizerProfile> };
  toDomainForUploadDocumentStatus(
    documentData: UploadDocumentUpdateDTO
  ): Partial<UploadDocument>;
}
