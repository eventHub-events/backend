import { UpdateOrganizerOverallVerificationStatusDTO } from "../../../DTOs/admin/OrganizerOverallVerificationDTO";
import { OrganizerVerificationResponseDTO } from "../../../DTOs/admin/OrganizerVerificationResponseDTO";
import { UpdatedUploadDocumentResponseDTO } from "../../../DTOs/admin/UpdatedUploadedDocumentDTO";
import { UploadDocumentUpdateDTO } from "../../../DTOs/admin/UploadDocumentUpdationDTO";
import { CompleteOrganizerDetailResponseDTO } from "../../../DTOs/admin/UserWithOrganizerProfileDTO";
import { UserResponseDTO } from "../../../DTOs/user/UserResponseDTO";


export interface IOrganizerVerificationUseCase{
  getOrganizerVerificationDetails(organizerId:string):Promise<OrganizerVerificationResponseDTO>
  getPendingOrganizers(): Promise<{ users: Omit<UserResponseDTO, "phone" | "password">[] } >
  getPendingOrganizersWithProfile():Promise<CompleteOrganizerDetailResponseDTO[]>
  updateDocumentStatus(organizerId:string,data:UploadDocumentUpdateDTO):Promise<UpdatedUploadDocumentResponseDTO>
  updateOverallVerificationStatus(organizerId:string,data:UpdateOrganizerOverallVerificationStatusDTO):Promise<string>
}



