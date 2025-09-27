import { UserRegisterDTO } from "../../domain/dtos/user/RegisterUserDTO";
import { UserResponseDTO } from "../../domain/dtos/user/UserResponseDTO";


export interface IOtpService {
  generateOtp(email: string, data: UserRegisterDTO): Promise<string>;
  reGenerateOtp(email:string):Promise<string>
  verifyOtp(email: string, otp: string): Promise< UserRegisterDTO | UserResponseDTO>;
}
