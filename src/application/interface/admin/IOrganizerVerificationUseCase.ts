import { OrganizerVerificationResponseDTO } from "../../../domain/dtos/admin/OrganizerVerificationResponseDTO";
import { UserResponseDTO } from "../../../domain/dtos/user/UserResponseDTO";

export interface IOrganizerVerificationUseCase{
  getOrganizerVerificationDetails(organizerId:string):Promise<OrganizerVerificationResponseDTO>
  getPendingOrganizers(): Promise<{ users: Omit<UserResponseDTO, "phone" | "password">[] } >
}