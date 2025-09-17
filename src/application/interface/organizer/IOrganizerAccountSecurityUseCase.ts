import { OrganizerChangePasswordDTO } from "../../../domain/dtos/organizer/OrganizerChangePasswordDTO";

export interface IOrganizerAccountSecurityUseCase {
  changePassword(organizerId:string,passwordData:OrganizerChangePasswordDTO):Promise<string>

}