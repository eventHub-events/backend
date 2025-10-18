import { ForgetPasswordDTO } from "../../../domain/DTOs/user/ForgetPasswordDTO"
import { ForgetPasswordResponseDTO } from "../../../domain/DTOs/user/ForgetPasswordResponseDTO"
export interface IForgetPasswordUseCase{
  forgetPassword(dto:ForgetPasswordDTO):Promise<ForgetPasswordResponseDTO>

}