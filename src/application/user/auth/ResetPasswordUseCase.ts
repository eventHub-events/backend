import { UserResponseDTO } from "../../../domain/dtos/user/UserResponseDTO";
import { IUserRepository } from "../../../domain/repositories/user/IUserRepository";
import { IHashService } from "../../interface/user/IHashService";
import { IResetPasswordUseCase } from "../../interface/user/IResetPasswordUseCase";

export class ResetPasswordUseCase implements IResetPasswordUseCase{
  constructor(private _useRepo:IUserRepository, private _hashingService:IHashService){}
  async resetPassword(id: string, password: string): Promise<UserResponseDTO> {
    const hashedPasword=this._hashingService.hash(password)
    const updatedUser= this._useRepo.
      
  }
}