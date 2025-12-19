import { IUserRepository } from '../../../../domain/repositories/user/IUserRepository';
import { IGoogleAuthUseCase } from '../../../interface/common/useCase/IGoogleAuthUseCase';
import { ITokenService } from '../../../interface/useCases/user/ITokenService';
import { RegistrationTypes } from '../../../../domain/enums/user/Authentication';
import { IUserBlankProfileCreationUseCase } from '../../../interface/useCases/user/user-profile/IUserBlankProfileCreationUseCase';
import { IOrganizerBlankProfileCreationUseCase } from '../../../interface/useCases/organizer/IOrganizerBlankProfileCreationUseCase';
import { IUserMapper } from '../../../interface/useCases/user/mapper/IUserMapper';
import { KycStatus } from '../../../../infrastructure/db/models/user/UserModel';
import { UserResponseDTO } from '../../../DTOs/user/UserResponseDTO';

import { ForbiddenError } from '../../../../domain/errors/userProfile';
import { ErrorMessages } from '../../../../constants/errorMessages';
import { UserRole } from '../../../../domain/enums/user/userRoles';

export class GoogleAuthUseCase implements IGoogleAuthUseCase {
  constructor(
    private _userRepository: IUserRepository,
    private _tokenService: ITokenService,
    private _userBlankProfileCreationUseCase: IUserBlankProfileCreationUseCase,
    private _organizerBlankProfileCreationUseCase: IOrganizerBlankProfileCreationUseCase,
    private _userMapper: IUserMapper
  ) {}
  async execute(googleUser: {
    googleId: string;
    role: string;
    email: string;
    name: string;
    picture?: string;
  }): Promise<{
    token: string;
    refreshToken: string;
    userData: UserResponseDTO;
  }> {
    let user = await this._userRepository.findByEmail(googleUser.email);

    if (user) {
      if (user.isBlocked) {
        throw new ForbiddenError(
          ErrorMessages.AUTH.BLOCK_ERROR,
          ErrorMessages.ERROR_CODES.USER_BLOCKED,
          user.role
        );
      }
    }

    if (!user) {
      const userData = {
        name: googleUser.name,
        email: googleUser.email,
        googleId: googleUser.googleId,
        isVerified: googleUser.role === UserRole.USER ? true : false,
        password: googleUser.googleId,
        role: googleUser.role,
        registrationMode: RegistrationTypes.GoogleAuth,
        phone: undefined,
        isBlocked: false,
        kycStatus:
          googleUser.role === UserRole.USER
            ? KycStatus.NotApplicable
            : KycStatus.Pending,
      };
      const userEntity = this._userMapper.toEntity(userData);
      user = await this._userRepository.createUser(userEntity);

      if (googleUser.role === UserRole.USER) {
        await this._userBlankProfileCreationUseCase.createBlankProfile(
          user.id!
        );
      } else if (googleUser.role === UserRole.ORGANIZER) {
        await this._organizerBlankProfileCreationUseCase.createBlankProfile(
          user.id!
        );
      }
    }

    const token = await this._tokenService.generateToken({
      id: user.id,
      role: user.role,
    });
    const refreshToken = await this._tokenService.generateRefreshToken({
      id: user.id,
      role: user.role,
    });
    const userData = this._userMapper.toResponseDTO(user);
    return { token, userData, refreshToken };
  }
}
