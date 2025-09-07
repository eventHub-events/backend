import { UpdateQuery } from 'mongoose';
import { UserRegisterDTO } from '../../dtos/user/RegisterUserDTO';
import { UserResponseDTO } from '../../dtos/user/UserResponseDTO';
import { User } from '../../entities/User';
import { IUserDocument } from '../../../infrastructure/db/models/UserModel';
import { IUserUpdateDTO } from '../../dtos/user/userUpdateDTO';
import { PaginationDTO } from '../../dtos/common/PaginationDTO';

export interface IUserRepository {
  createUser(user:UserRegisterDTO):Promise<User>;
  findByEmail(email:string):Promise<User | null>;
  verifyUser(email:string):Promise<User|null>
  findAllUsers(pagination:PaginationDTO):Promise<{users:Omit<UserResponseDTO, "phone" | "password">[],total:number}|null>
  updateUser(id: string, data: IUserUpdateDTO):Promise<UserResponseDTO>
}
