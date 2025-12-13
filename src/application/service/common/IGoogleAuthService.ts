import { GoogleAuthServiceDTO } from '../../DTOs/common/googleAuthServiceDTO';

export interface IGoogleAuthService {
  verifyGoogleToken(
    idToken: string,
    role: string
  ): Promise<GoogleAuthServiceDTO>;
}
