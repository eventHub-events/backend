import { IUserRepository } from "../../../domain/repositories/user/IUserRepository";
import { IUserLoginResponse } from "../../../domain/types/IUserLoginResponse";
import { IUserTokenPayload } from "../../../infrastructure/interface/IUserTokenPayload";
import { IHashService } from "../../interface/user/IHashService";
import { ILoginUserUseCase } from "../../interface/user/ILoginUserUseCase";
import { ITokenService } from "../../interface/user/ITokenService";

 export  class LoginUserUseCase implements ILoginUserUseCase{
 constructor(private _tokenService:ITokenService,private _hashService:IHashService, private _userRepository:IUserRepository){}


 
async loginUser(email: string, password: string): Promise<IUserLoginResponse> {
        
    const userDoc= await this._userRepository.verifyUser(email)
    console.log("user in login use case",userDoc)
      if(!userDoc)  throw new Error("user is not found")
        const hashedPassword= userDoc.password
      const  isPasswordValid= await this._hashService.compare(password,hashedPassword)
        
        if(!isPasswordValid) throw new Error("Invalid password")
          const payload:IUserTokenPayload={id:userDoc.id!,role:userDoc.role}
       
        
        const token= await this._tokenService.generateToken(payload)
        const refreshToken= await this._tokenService.generateRefreshToken(payload)
        const user={
          id:userDoc.id,
          name:userDoc.name,
          email:userDoc.email,
          role:userDoc.role,
          isVerified:userDoc.isVerified
        }
        
       return {token,refreshToken,user}

      
  }
 }