
import { UserRegisterDTO } from "../../../DTOs/user/RegisterUserDTO";
import { ResetPasswordOtpDTO } from "../../../DTOs/user/ResetPasswordDTO";
import { UserResponseDTO } from "../../../DTOs/user/UserResponseDTO";

export interface  IVerifyResetPasswordOtpUseCase{
  resetPassword(data: ResetPasswordOtpDTO): Promise<{user: UserRegisterDTO, token:string  }>
}