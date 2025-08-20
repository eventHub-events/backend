import { ChangePasswordDTO } from "../../../domain/dtos/user/ChangePasswordDTO";
import { UserResponseDTO } from "../../../domain/dtos/user/UserResponseDTO";
import { IUserRepository } from "../../../domain/repositories/user/IUserRepository";
import { ILoggerService } from "../../interface/common/ILoggerService";
import { IChangePasswordUseCase } from "../../interface/user/IChangePasswordUsecase";
import { IHashService } from "../../interface/user/IHashService";
import { ITokenService } from "../../interface/user/ITokenService";

export class ChangePasswordUseCase implements IChangePasswordUseCase{
  constructor(private _userRepository:IUserRepository, private _tokenService:ITokenService,private _hashService:IHashService,private _loggerService:ILoggerService ){}

async changePassword(input:{data: ChangePasswordDTO,token:string}): Promise<UserResponseDTO> {
  try{
    
    const result=await this._tokenService.verifyToken(input.token)
    this._loggerService.info(`is token  verified ${result}`)
    const {password}=input.data
    this._loggerService.info(`Password change attempt for ${result.email}`);
    const hashedPassword= await this._hashService.hash(password)
      const userDetails= await this._userRepository.updateUserData(result.email,{password:hashedPassword})
      return userDetails
  }catch(err){
    throw  err instanceof Error?err: new Error("Error in updating password")
  }

}
}