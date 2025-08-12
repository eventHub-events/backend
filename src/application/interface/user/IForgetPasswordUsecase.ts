import { UserResponseDTO } from "../../../domain/dtos/user/UserResponseDTO";

export interface IForgetPasswordUseCase{
  forgetPassword(id:string,email:string):Promise<string>

}