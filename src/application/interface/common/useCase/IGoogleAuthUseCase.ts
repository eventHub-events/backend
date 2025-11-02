
import { UserEntity } from "../../../../domain/entities/User";

export interface IGoogleAuthUseCase{
   execute(googleUser: { googleId: string; email: string; name: string; picture?: string; }): Promise<{token: string, refreshToken: string, user: UserEntity}> ;
}