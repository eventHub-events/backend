import { ChangePasswordDTO } from "../../../../domain/DTOs/user/ChangePasswordDTO";
import { UserResponseDTO } from "../../../../domain/DTOs/user/UserResponseDTO";
import { IUserRepository } from "../../../../domain/repositories/user/IUserRepository";
import { CustomError } from "../../../../infrastructure/errors/errorClass";
import { HttpStatusCode } from "../../../../infrastructure/interface/enums/HttpStatusCode";
import { userForgetPassWordSchema } from "../../../../infrastructure/validation/schemas/changePasswordSchema";
import { ILoggerService } from "../../../interface/common/ILoggerService";
import { IChangePasswordUseCase } from "../../../interface/user/IChangePasswordUsecase";
import { IHashService } from "../../../interface/user/IHashService";
import { ITokenService } from "../../../interface/user/ITokenService";
import { IUserMapper } from "../../../interface/user/mapper/IUserMapper";

export class ChangePasswordUseCase implements IChangePasswordUseCase{
  constructor(
              private _userRepository:IUserRepository,
              private _tokenService:ITokenService,
              private _hashService:IHashService,
              private _loggerService:ILoggerService,
              private _userMapper: IUserMapper
             ){}

async changePassword(data: ChangePasswordDTO,token:string): Promise< UserResponseDTO > {

  console.log("passssword is",data)

  
    const passwordUpdateDTO= userForgetPassWordSchema.parse(data)
   

    const result=await this._tokenService.verifyToken(token);

    if(!result) throw new CustomError("Token verification failed",HttpStatusCode.UNAUTHORIZED);

    this._loggerService.info(`is token  verified ${result}`);

    const {password}= passwordUpdateDTO;

    this._loggerService.info(`Password change attempt for ${result.email}`);

    const hashedPassword= await this._hashService.hash(password as string);

      const userDetails= await this._userRepository.updateUserData(result.email,{password:hashedPassword});
      return this._userMapper.toResponse(userDetails)

      
  

}
}