import { ChangePasswordDTO } from "../../../DTOs/user/ChangePasswordDTO";
import { UserResponseDTO } from "../../../DTOs/user/UserResponseDTO";
import { IUserRepository } from "../../../../domain/repositories/user/IUserRepository";
import { CustomError } from "../../../../infrastructure/errors/errorClass";
import { HttpStatusCode } from "../../../../infrastructure/interface/enums/HttpStatusCode";
import { ILoggerService } from "../../../interface/common/ILoggerService";
import { IChangePasswordUseCase } from "../../../interface/useCases/user/IChangePasswordUseCase";
import { IHashService } from "../../../interface/useCases/user/IHashService";
import { ITokenService } from "../../../interface/useCases/user/ITokenService";
import { IUserMapper } from "../../../interface/useCases/user/mapper/IUserMapper";

export class ChangePasswordUseCase implements IChangePasswordUseCase{
  constructor(
              private _userRepository:IUserRepository,
              private _tokenService:ITokenService,
              private _hashService:IHashService,
              private _loggerService:ILoggerService,
              private _userMapper: IUserMapper
             ){}

async changePassword(dto: ChangePasswordDTO, token:string): Promise< UserResponseDTO > {


    const result = await this._tokenService.verifyToken(token);

    if(!result) throw new CustomError("Token verification failed",HttpStatusCode.UNAUTHORIZED);

    this._loggerService.info(`is token  verified ${result}`);

    const { password }=  dto;

    this._loggerService.info(`Password change attempt for ${result.email}`);

    const hashedPassword= await this._hashService.hash(password as string);

      const userDetails= await this._userRepository.UpdateUserByEmail(result.email,{password:hashedPassword});
      return this._userMapper.toResponseDTO(userDetails);

      
  

}
}