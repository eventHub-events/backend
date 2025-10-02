import { UpdateOrganizerOverallVerificationStatusDTO } from "../../../domain/dtos/admin/OrganizerOverallVerificationDTO";
import { OrganizerVerificationResponseDTO } from "../../../domain/dtos/admin/OrganizerVerificationResponseDTO";
import { UpdatedUploadDocumentResponseDTO } from "../../../domain/dtos/admin/UpdatedUploadedDocumentDTO";
import { UploadDocumentUpdateDTO } from "../../../domain/dtos/admin/UploadDocumentUpdationDTO";
import { CompleteOrganizerDetailResponseDTO } from "../../../domain/dtos/admin/UserWithOrganizerProfileDTO";
import { UserResponseDTO } from "../../../domain/dtos/user/UserResponseDTO";


export interface IOrganizerVerificationUseCase{
  getOrganizerVerificationDetails(organizerId:string):Promise<OrganizerVerificationResponseDTO>
  getPendingOrganizers(): Promise<{ users: Omit<UserResponseDTO, "phone" | "password">[] } >
  getPendingOrganizersWithProfile():Promise<CompleteOrganizerDetailResponseDTO[]>
  updateDocumentStatus(organizerId:string,data:UploadDocumentUpdateDTO):Promise<UpdatedUploadDocumentResponseDTO>
  updateOverallVerificationStatus(organizerId:string,data:UpdateOrganizerOverallVerificationStatusDTO):Promise<string>
}



