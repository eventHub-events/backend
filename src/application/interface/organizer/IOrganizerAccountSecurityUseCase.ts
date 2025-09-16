import { OrganizerChangePasswordDTO } from "../../../domain/dtos/organizer/OrganizerChangePasswordDTO";

export interface IOrganizerAccountSecurityUseCase {
  changePassword(passwordData:OrganizerChangePasswordDTO):Promise<void>

}