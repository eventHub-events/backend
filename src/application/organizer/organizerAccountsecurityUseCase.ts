import { OrganizerChangePasswordDTO } from "../../domain/dtos/organizer/OrganizerChangePasswordDTO";
import { IUserRepository } from "../../domain/repositories/user/IUserRepository";
import { IOrganizerAccountSecurityUseCase } from "../interface/organizer/IOrganizerAccountSecurityUseCase";

export class OrganizerAccountSecurityUseCase implements IOrganizerAccountSecurityUseCase{

  constructor(private _userRepository : IUserRepository){}

  async changePassword(passwordData: OrganizerChangePasswordDTO): Promise<void> {
     
    
  }

}