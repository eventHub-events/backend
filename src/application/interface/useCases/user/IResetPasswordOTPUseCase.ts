
import { UserRegisterDTO } from "../../../../domain/DTOs/user/RegisterUserDTO";
import { ResetPasswordOtpDTO } from "../../../../domain/DTOs/user/ResetPasswordDTO";
import { UserResponseDTO } from "../../../../domain/DTOs/user/UserResponseDTO";

export interface  IVerifyResetPasswordOtpUseCase{
  resetPassword(data: ResetPasswordOtpDTO): Promise<{user: UserRegisterDTO, token:string  }>
}