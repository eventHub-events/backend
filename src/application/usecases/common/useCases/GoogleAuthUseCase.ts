import { IUserRepository } from "../../../../domain/repositories/user/IUserRepository";
import { IGoogleAuthUseCase } from "../../../interface/common/useCase/IGoogleAuthUseCase";
import { ITokenService } from "../../../interface/useCases/user/ITokenService";

export class GoogleAuthUseCase implements IGoogleAuthUseCase {

  constructor(
       private _userRepository : IUserRepository,
       private _tokenService : ITokenService


  ){}
  async execute(googleUser: { googleId: string; email: string; name: string; picture?: string; }): Promise<void> {
    
     let user = await this._userRepository.findByEmail(googleUser.email);
     if(!user) {
         user = await this._userRepository.createUser({
            name: googleUser.name,
            email: googleUser.email,
            googleId :googleUser.googleId,
            isVerified: true

         })
     }
  }
}