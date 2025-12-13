import { ResponseMessages } from '../../../../infrastructure/constants/responseMessages';
import { ILogoutUseCase } from '../../../interface/useCases/user/ILogoutUseCase';

export class LogoutUserUseCase implements ILogoutUseCase {
  async execute(): Promise<string> {
    return ResponseMessages.AUTHENTICATION.LOGOUT.LOGOUT_SUCCESS;
  }
}
