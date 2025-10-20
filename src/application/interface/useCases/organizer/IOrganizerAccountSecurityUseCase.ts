import { OrganizerChangePasswordDTO } from "../../../../domain/DTOs/organizer/OrganizerChangePasswordDTO";

export interface IOrganizerAccountSecurityUseCase {
  changePassword(organizerId:string,passwordData:OrganizerChangePasswordDTO):Promise<string>

}