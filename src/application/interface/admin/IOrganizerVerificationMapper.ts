import { UpdateOrganizerOverallVerificationStatusDTO } from "../../../domain/dtos/admin/OrganizerOverallVerificationDTO";
import { OrganizerVerificationResponseDTO } from "../../../domain/dtos/admin/OrganizerVerificationResponseDTO";
import { UpdatedUploadDocumentResponseDTO } from "../../../domain/dtos/admin/UpdatedUploadedDocumentDTO";
import { UploadDocumentUpdateDTO } from "../../../domain/dtos/admin/UploadDocumentUpdationDTO";
import { CompleteOrganizerDetailResponseDTO } from "../../../domain/dtos/admin/UserWithOrganizerProfileDTO";
import { UploadDocument } from "../../../domain/entities/organizer/Document";
import { OrganizerProfile } from "../../../domain/entities/organizer/OrganizerProfile";
import { User } from "../../../domain/entities/User";
import { OrganizerProfileWithUser } from "../../../domain/types/OrganizerTypes";

export interface IOrganizerVerificationMapper {
  toResponse(profile: OrganizerProfile, user: User, Docs: UploadDocument[] ): OrganizerVerificationResponseDTO;
  toOrganizerDetailsResponse(organizerData: OrganizerProfileWithUser[] ):  CompleteOrganizerDetailResponseDTO[];
  toResponseAfterUpdate(documentData: UploadDocument) : UpdatedUploadDocumentResponseDTO;
  toDomainForOverallVerification(data: UpdateOrganizerOverallVerificationStatusDTO) : {user:Partial<User>,profile : Partial<OrganizerProfile>};
  toDomainForUploadDocumentStatus(documentData : UploadDocumentUpdateDTO ): Partial<UploadDocument>;
   

}