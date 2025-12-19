import { OAuth2Client } from 'google-auth-library';
import { IGoogleAuthService } from '../../../application/service/common/IGoogleAuthService';
import { ErrorMessages } from '../../../constants/errorMessages';
import { ENV } from '../../config/common/env';

export class GoogleAuthService implements IGoogleAuthService {
  private _client: OAuth2Client;

  constructor() {
    this._client = new OAuth2Client(ENV.GOOGLE_CLIENT_ID);
  }

  async verifyGoogleToken(idToken: string, role: string) {
    const ticket = await this._client.verifyIdToken({
      idToken,
      audience: ENV.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) throw new Error(ErrorMessages.GOOGLE_LOGIN.TOKEN_INVALID);

    if (!payload.name || !payload.email)
      throw new Error(ErrorMessages.GOOGLE_LOGIN.NAME_AND_EMAIL_REQUIRED);
    return {
      googleId: payload.sub,
      email: payload.email,
      name: payload.name,
      role: role,
      picture: payload.picture,
    };
  }
}
