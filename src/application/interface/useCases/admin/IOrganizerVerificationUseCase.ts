import { UpdateOrganizerOverallVerificationStatusDTO } from "../../../../domain/DTOs/admin/OrganizerOverallVerificationDTO";
import { OrganizerVerificationResponseDTO } from "../../../../domain/DTOs/admin/OrganizerVerificationResponseDTO";
import { UpdatedUploadDocumentResponseDTO } from "../../../../domain/DTOs/admin/UpdatedUploadedDocumentDTO";
import { UploadDocumentUpdateDTO } from "../../../../domain/DTOs/admin/UploadDocumentUpdationDTO";
import { CompleteOrganizerDetailResponseDTO } from "../../../../domain/DTOs/admin/UserWithOrganizerProfileDTO";
import { UserResponseDTO } from "../../../../domain/DTOs/user/UserResponseDTO";


export interface IOrganizerVerificationUseCase{
  getOrganizerVerificationDetails(organizerId:string):Promise<OrganizerVerificationResponseDTO>
  getPendingOrganizers(): Promise<{ users: Omit<UserResponseDTO, "phone" | "password">[] } >
  getPendingOrganizersWithProfile():Promise<CompleteOrganizerDetailResponseDTO[]>
  updateDocumentStatus(organizerId:string,data:UploadDocumentUpdateDTO):Promise<UpdatedUploadDocumentResponseDTO>
  updateOverallVerificationStatus(organizerId:string,data:UpdateOrganizerOverallVerificationStatusDTO):Promise<string>
}



