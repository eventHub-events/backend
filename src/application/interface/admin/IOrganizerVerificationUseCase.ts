import { OrganizerVerificationResponseDTO } from "../../../domain/dtos/admin/OrganizerVerificationResponseDTO";

export interface IOrganizerVerificationUseCase{
  getOrganizerVerificationDetails(organizerId:string):Promise<OrganizerVerificationResponseDTO>
}