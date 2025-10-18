import { ChangePasswordDTO } from "../../../domain/DTOs/user/ChangePasswordDTO"
import { UserResponseDTO } from "../../../domain/DTOs/user/UserResponseDTO"

export interface IChangePasswordUseCase{
  changePassword(data:ChangePasswordDTO,token:string):Promise<UserResponseDTO>
}