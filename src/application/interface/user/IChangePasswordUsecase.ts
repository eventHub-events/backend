import { ChangePasswordDTO } from "../../../domain/dtos/user/ChangePasswordDTO"
import { UserResponseDTO } from "../../../domain/dtos/user/UserResponseDTO"

export interface IChangePasswordUseCase{
  changePassword(data:ChangePasswordDTO,token:string):Promise<UserResponseDTO>
}