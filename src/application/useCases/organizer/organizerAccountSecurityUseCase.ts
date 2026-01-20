import { OrganizerChangePasswordDTO } from '../../DTOs/organizer/OrganizerChangePasswordDTO';
import { IUserRepository } from '../../../domain/repositories/user/IUserRepository';
import { CustomError } from '../../../infrastructure/errors/errorClass';
import { HttpStatusCode } from '../../../infrastructure/interface/enums/HttpStatusCode';
import { IOrganizerAccountSecurityUseCase } from '../../interface/useCases/organizer/IOrganizerAccountSecurityUseCase';
import { IHashService } from '../../interface/useCases/user/IHashService';
import { ErrorMessages } from '../../../constants/errorMessages';
import { ResponseMessages } from '../../../infrastructure/constants/responseMessages';

export class OrganizerAccountSecurityUseCase implements IOrganizerAccountSecurityUseCase {
  constructor(
    private _userRepository: IUserRepository,
    private _hashingService: IHashService
  ) {}

  async changePassword(
    organizerId: string,
    passwordData: OrganizerChangePasswordDTO
  ): Promise<string> {
    try {
      const { currentPassword, newPassword } = passwordData;

      if (!newPassword) {
        throw new CustomError(
          ErrorMessages.AUTH.NEW_PASSWORD_REQUIRED,
          
          HttpStatusCode.BAD_REQUEST
        );
      }

    
      
      const organizer = await this._userRepository.findUserById(organizerId);
      
      if (!organizer) {
        throw new CustomError(ErrorMessages.ORGANIZER.NOT_FOUND, HttpStatusCode.NOT_FOUND);
      }

      
      const isSame = await this._hashingService.compare(
        currentPassword,
        organizer.password!
      );
      if (!isSame) {
        throw new CustomError(
          ErrorMessages.AUTH.PASSWORD_INVALID,
          HttpStatusCode.UNAUTHORIZED
        );
      }

    
      const newHash = await this._hashingService.hash(newPassword);
      const isReused = await this._hashingService.compare(
        newPassword,
        organizer.password!
      );
      if (isReused) {
        throw new CustomError(
          ErrorMessages.AUTH.SAME_PASSWORD_ERROR,
          
          HttpStatusCode.BAD_REQUEST
        );
      }

     
      const updated = await this._userRepository.updateUser(organizerId, {
        password: newHash,
      });
      if (!updated) {
        throw new CustomError(
          ErrorMessages.AUTH.PASSWORD_UPDATE_ERROR,
          HttpStatusCode.INTERNAL_SERVER_ERROR
        );
      }

      return ResponseMessages.AUTHENTICATION.PASSWORD.PASSWORD_UPDATE_SUCCESS;
    } catch (err: unknown) {
      if (err instanceof CustomError) {
        throw err;
      }

      if (err instanceof Error) {
        throw new CustomError(
          err.message,
          HttpStatusCode.INTERNAL_SERVER_ERROR
        );
      }

      throw new CustomError(
        ErrorMessages.AUTH.UNKNOWN_ERROR,
        HttpStatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }
}
