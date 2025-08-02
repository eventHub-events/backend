import { UserResponseDTO } from '../../../domain/dtos/user/UserResponseDTO';
import { User } from '../../../domain/entities/User';

export interface IVerifyOtpUseCase {
  execute(email:string, otp:string):Promise<UserResponseDTO>
}
