import { UserResponseDTO } from '../../../DTOs/user/UserResponseDTO';

export interface IGoogleAuthUseCase {
  execute(googleUser: {
    googleId: string;
    email: string;
    name: string;
    picture?: string;
  }): Promise<{
    token: string;
    refreshToken: string;
    userData: UserResponseDTO;
  }>;
}
