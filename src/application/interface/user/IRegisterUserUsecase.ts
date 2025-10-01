import { UserRegisterDTO } from '../../../domain/dtos/user/RegisterUserDTO';
import { UserRegisterResponseDTO } from '../../../domain/dtos/user/UserRegisterResponseDTO';

export interface IRegisterUserUseCase {
  execute(data: UserRegisterDTO): Promise< UserRegisterResponseDTO >;
}
