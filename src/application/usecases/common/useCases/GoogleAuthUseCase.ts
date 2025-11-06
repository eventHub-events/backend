

import { IUserRepository } from "../../../../domain/repositories/user/IUserRepository";
import { IGoogleAuthUseCase } from "../../../interface/common/useCase/IGoogleAuthUseCase";
import { ITokenService } from "../../../interface/useCases/user/ITokenService";
import { UserEntity } from "../../../../domain/entities/User";
import { RegistrationTypes } from "../../../../domain/enums/user/Authentication";
import { IUserBlankProfileCreationUseCase } from "../../../interface/useCases/user/user-profile/IUserBlankProfileCreationUseCase";
import { IOrganizerBlankProfileCreationUseCase } from "../../../interface/useCases/organizer/IOrganizerBlankProfileCreationUseCase";

export class GoogleAuthUseCase implements IGoogleAuthUseCase {

  constructor(
       private _userRepository : IUserRepository,
       private _tokenService : ITokenService,
       private _userBlankProfileCreationUseCase : IUserBlankProfileCreationUseCase,
       private _organizerBlankProfileCreationUseCase : IOrganizerBlankProfileCreationUseCase


  ){}
  async execute(googleUser: { googleId: string; role:string, email: string; name: string; picture?: string; }): Promise<{token: string, refreshToken: string, user: UserEntity}> {
    
     let user = await this._userRepository.findByEmail(googleUser.email);
    
     if(!user) {
         user = await this._userRepository.createUser({
            name: googleUser.name,
            email: googleUser.email,
            googleId :googleUser.googleId,
            isVerified: googleUser.role ==="user"? true : false,
            password: googleUser.googleId,
            role:  googleUser.role,
            registrationMode: RegistrationTypes.GoogleAuth
            
         })
      
       if(googleUser.role === "user") {
           await this._userBlankProfileCreationUseCase.createBlankProfile(user.id!);
       }else if(googleUser.role === "organizer") {
          await this._organizerBlankProfileCreationUseCase.createBlankProfile(user.id!);
       }
         
     }





    const token =  await this._tokenService.generateToken({
                  id: user.id,
                  role: user.role
            })
    const refreshToken = await this._tokenService.generateRefreshToken({
                  id: user.id,
                  role: user.role
    })
     return {token , user, refreshToken }
  }
}