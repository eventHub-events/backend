
import { OrganizerChangePasswordDTO } from "../../DTOs/organizer/OrganizerChangePasswordDTO";
import { IUserRepository } from "../../../domain/repositories/user/IUserRepository";
import { CustomError } from "../../../infrastructure/errors/errorClass";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { IOrganizerAccountSecurityUseCase } from "../../interface/useCases/organizer/IOrganizerAccountSecurityUseCase";
import { IHashService } from "../../interface/useCases/user/IHashService";

export class OrganizerAccountSecurityUseCase implements IOrganizerAccountSecurityUseCase{

  constructor(
    private _userRepository : IUserRepository,
    private _hashingService : IHashService,



  ){}

  async changePassword(organizerId: string, passwordData: OrganizerChangePasswordDTO): Promise<string> {
  try {
    const { currentPassword, newPassword } = passwordData;
    

    if (!newPassword) {
      throw new CustomError("New password is required", HttpStatusCode.BAD_REQUEST);
    }

    // 1. Fetch the user
    console.log("orrrr",organizerId)
    const organizer = await this._userRepository.findUserById(organizerId);
    console.log("organizer is ",organizer)
    if (!organizer) {
      throw new CustomError("Organizer not found", HttpStatusCode.NOT_FOUND);
    }

    // 2. Compare current password with stored hash
    const isSame = await this._hashingService.compare(currentPassword, organizer.password);
    if (!isSame) {
      throw new CustomError("Current password is incorrect", HttpStatusCode.UNAUTHORIZED);
    }

    // 3. Check if new password is same as current one
    const newHash = await this._hashingService.hash(newPassword);
    const isReused = await this._hashingService.compare(newPassword, organizer.password);
    if (isReused) {
      throw new CustomError("Please use a different password", HttpStatusCode.BAD_REQUEST);
    }

    // 4. Update password
    const updated = await this._userRepository.updateUser(organizerId, { password: newHash });
    if (!updated) {
      throw new CustomError("Failed to update password", HttpStatusCode.INTERNAL_SERVER_ERROR);
    }

    return "Password updated successfully";

  } catch (err: unknown) {
   
   if (err instanceof CustomError) {
    throw err; 
  }

  if (err instanceof Error) {
    throw new CustomError(err.message, HttpStatusCode.INTERNAL_SERVER_ERROR);
  }

  
  throw new CustomError("Unknown error occurred", HttpStatusCode.INTERNAL_SERVER_ERROR);
}
  }
}


  


