import { UserRegisterDTO } from '../../../domain/dtos/user/RegisterUserDTO';

export interface IRegisterUserUseCase {
  execute(data: UserRegisterDTO): Promise<{ message: string }>;
}
