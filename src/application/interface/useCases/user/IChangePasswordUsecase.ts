import { ChangePasswordDTO } from "../../../DTOs/user/ChangePasswordDTO"
import { UserResponseDTO } from "../../../DTOs/user/UserResponseDTO"

export interface IChangePasswordUseCase{
  changePassword(data:ChangePasswordDTO,token:string):Promise<UserResponseDTO>
}