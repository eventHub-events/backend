import { ChangePasswordDTO } from "../../../domain/dtos/user/ChangePasswordDTO"
import { UserResponseDTO } from "../../../domain/dtos/user/UserResponseDTO"

export interface IChangePasswordUseCase{
  changePassword(input:{data:ChangePasswordDTO,token:string|null}):Promise<UserResponseDTO>
}