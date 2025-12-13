import { ErrorMessages } from '../../../../constants/errorMessages';
import { IUserRepository } from '../../../../domain/repositories/user/IUserRepository';
import { IUserLoginResponse } from '../../../../domain/types/IUserLoginResponse';

import { IUserTokenPayload } from '../../../../infrastructure/interface/IUserTokenPayload';
import { IHashService } from '../../../interface/useCases/user/IHashService';
import { ILoginUserUseCase } from '../../../interface/useCases/user/ILoginUserUseCase';
import { ITokenService } from '../../../interface/useCases/user/ITokenService';

export class LoginUserUseCase implements ILoginUserUseCase {
  constructor(
    private _tokenService: ITokenService,
    private _hashService: IHashService,
    private _userRepository: IUserRepository
  ) {}

  async loginUser(
    email: string,
    password: string
  ): Promise<IUserLoginResponse> {
    const userDoc = await this._userRepository.verifyUser(email);

    if (!userDoc) throw new Error(ErrorMessages.USER.NOT_FOUND);

    if (userDoc.isBlocked) throw new Error(ErrorMessages.USER.USER_BLOCK_ADMIN);
    const hashedPassword = userDoc.password;

    const isPasswordValid = await this._hashService.compare(
      password,
      hashedPassword!
    );

    if (!isPasswordValid) throw new Error(ErrorMessages.AUTH.PASSWORD_INVALID);
    const payload: IUserTokenPayload = { id: userDoc.id!, role: userDoc.role! };

    const token = await this._tokenService.generateToken(payload);
    const refreshToken = await this._tokenService.generateRefreshToken(payload);

    const user = {
      id: userDoc.id!,
      name: userDoc.name,
      email: userDoc.email,
      role: userDoc.role!,
      isBlocked: userDoc.isBlocked!,
      isVerified: userDoc.isVerified,
      isKycResubmitted: userDoc.isKycResubmitted,
      kycStatus: userDoc.kycStatus!,
      stripOnboarded: userDoc.stripeOnboarded,
    };

    return { token, refreshToken, user };
  }
}
