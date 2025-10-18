import { UserRegisterDTO } from '../../../../domain/DTOs/user/RegisterUserDTO';
import { UserRegisterResponseDTO } from '../../../../domain/DTOs/user/UserRegisterResponseDTO';

export interface IRegisterUserUseCase {
  execute(data: UserRegisterDTO): Promise< UserRegisterResponseDTO >;
}
