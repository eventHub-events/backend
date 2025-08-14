
import { UserRegisterDTO } from '../../dtos/user/RegisterUserDTO';
import { UserResponseDTO } from '../../dtos/user/UserResponseDTO';
import { User } from '../../entities/User';
import { IUserUpdateDTO } from '../../dtos/user/userUpdateDTO';

export interface IUserRepository {
  createUser(user:UserRegisterDTO):Promise<User>;
  findByEmail(email:string):Promise<User | null>;
  verifyUser(email:string):Promise<User|null>
  findAllUsers():Promise<Omit<UserResponseDTO, "phone" | "password">[]|null>
  updateUser(id: string, data: IUserUpdateDTO):Promise<UserResponseDTO>
}
