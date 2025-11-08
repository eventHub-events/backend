import { UserRegisterDTO } from '../../../DTOs/user/RegisterUserDTO';
import { UserRegisterResponseDTO } from '../../../DTOs/user/UserRegisterResponseDTO';

export interface IRegisterUserUseCase {
  execute(data: UserRegisterDTO): Promise< UserRegisterResponseDTO >;
}
