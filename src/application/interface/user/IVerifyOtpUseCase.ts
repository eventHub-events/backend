import { UserResponseDTO } from '../../../domain/DTOs/user/UserResponseDTO';


export interface IVerifyOtpUseCase {
  execute(email:string, otp:string):Promise<UserResponseDTO>
}
