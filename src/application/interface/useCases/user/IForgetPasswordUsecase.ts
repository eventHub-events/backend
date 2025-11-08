import { ForgetPasswordDTO } from "../../../DTOs/user/ForgetPasswordDTO"
import { ForgetPasswordResponseDTO } from "../../../DTOs/user/ForgetPasswordResponseDTO"
export interface IForgetPasswordUseCase{
  forgetPassword(dto:ForgetPasswordDTO):Promise<ForgetPasswordResponseDTO>

}