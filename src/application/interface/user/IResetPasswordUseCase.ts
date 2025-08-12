import { UserResponseDTO } from "../../../domain/dtos/user/UserResponseDTO";

export interface IResetPasswordUseCase{
  resetPassword(id:string,password:string):Promise<UserResponseDTO>
}