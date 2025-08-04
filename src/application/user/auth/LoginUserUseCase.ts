import { IUserRepository } from "../../../domain/repositories/user/IUserRepository";
import { IUserTokenPayload } from "../../../infrastructure/interface/IUserTokenPayload";
import { IHashService } from "../../interface/user/IHashService";
import { ILoginUserUseCase } from "../../interface/user/ILoginUserUseCase";
import { ITokenService } from "../../interface/user/ITokenService";

 export  class LoginUserUseCase implements ILoginUserUseCase{
 constructor(private _tokenService:ITokenService,private _hashService:IHashService, private _userRepository:IUserRepository){}


 
async loginUser(email: string, password: string): Promise<{ token: string; refreshToken: string; }> {
         console.log("heelo  from loginuser use case")
    const user= await this._userRepository.verifyUser(email)
    console.log("user in login use case",user)
      if(!user)  throw new Error("user is not found")
        const hashedPassword= user.password
      const  isPasswordValid= await this._hashService.compare(password,hashedPassword)
        
        if(!isPasswordValid) throw new Error("Invalid password")
          const payload:IUserTokenPayload={id:user.id!,role:user.role}
        console.log("paylaod",payload)
        
        const token= await this._tokenService.generateToken(payload)
        const refreshToken= await this._tokenService.generateRefreshToken(payload)
        
       return {token,refreshToken}

      
  }
 }