
import { UserRegisterDTO } from "../../../DTOs/user/RegisterUserDTO";
import { ResetPasswordOtpDTO } from "../../../DTOs/user/ResetPasswordDTO";


export interface  IVerifyResetPasswordOtpUseCase{
  resetPassword(data: ResetPasswordOtpDTO): Promise<{user: UserRegisterDTO, token:string  }>
}