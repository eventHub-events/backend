import { UpdateOrganizerOverallVerificationStatusDTO } from "../../../domain/dtos/admin/OrganizerOverallVerificationDTO";
import { OrganizerVerificationResponseDTO } from "../../../domain/dtos/admin/OrganizerVerificationResponseDTO";
import { UpdatedUploadDocumentResponseDTO } from "../../../domain/dtos/admin/UpdatedUploadedDocumentDTO";
import { UploadDocumentUpdateDTO } from "../../../domain/dtos/admin/UploadDocumentUpdationDTO";
import { UserWithOrganizerProfileDTO } from "../../../domain/dtos/admin/UserWithOrganizerProfileDTO";
import { UserResponseDTO } from "../../../domain/dtos/user/UserResponseDTO";
import { UploadDocument } from "../../../infrastructure/db/models/organizer/profile/UploadDocument";

export interface IOrganizerVerificationUseCase{
  getOrganizerVerificationDetails(organizerId:string):Promise<OrganizerVerificationResponseDTO>
  getPendingOrganizers(): Promise<{ users: Omit<UserResponseDTO, "phone" | "password">[] } >
  getPendingOrganizersWithProfile():Promise<UserWithOrganizerProfileDTO[]>
  updateDocumentStatus(organizerId:string,data:UploadDocumentUpdateDTO):Promise<UpdatedUploadDocumentResponseDTO>
  updateOverallVerificationStatus(organizerId:string,data:UpdateOrganizerOverallVerificationStatusDTO):Promise<string>
}



