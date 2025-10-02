
import { UserRegisterDTO } from "../../../domain/dtos/user/RegisterUserDTO";
import { ResetPasswordOtpDTO } from "../../../domain/dtos/user/ResetPasswordDTO";
import { UserResponseDTO } from "../../../domain/dtos/user/UserResponseDTO";

export interface  IVerifyResetPasswordOtpUseCase{
  resetPassword(data: ResetPasswordOtpDTO): Promise<{user: UserRegisterDTO, token:string  }>
}