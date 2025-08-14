import { UserResponseDTO } from '../../../domain/dtos/user/UserResponseDTO';


export interface IVerifyOtpUseCase {
  execute(email:string, otp:string):Promise<UserResponseDTO>
}
