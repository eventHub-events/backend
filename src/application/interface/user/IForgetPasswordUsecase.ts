import { ForgetPasswordDTO } from "../../../domain/dtos/user/ForgetPasswordDTO"
import { ForgetPasswordResponseDTO } from "../../../domain/dtos/user/ForgetPasswordResponseDTO"
export interface IForgetPasswordUseCase{
  forgetPassword(dto:ForgetPasswordDTO):Promise<ForgetPasswordResponseDTO>

}