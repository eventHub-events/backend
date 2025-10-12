

import { UserResponseDTO } from '../../dtos/user/UserResponseDTO';
import { User } from '../../entities/User';
import { PaginationDTO } from '../../dtos/common/PaginationDTO';
import { FilterQuery } from 'mongoose';
import { IUserDocument } from '../../../infrastructure/db/models/user/UserModel';

export interface IUserRepository {
  createUser(user:Partial<IUserDocument>):Promise<User>;
  findByEmail(email:string):Promise< User | null>;
  findUserById(id:string):Promise<User |null>
  verifyUser(email:string):Promise<User|null>;
  findAllWithFilter(filter:FilterQuery<User> ):Promise<{users:Omit<UserResponseDTO, "phone" | "password">[],}|null>;
  findAllUsers(pagination:PaginationDTO):Promise<{users:Omit<UserResponseDTO, "phone" | "password">[],total:number}|null>;
  updateUser(id: string, data: Partial< User >):Promise< User >;
  updateUserData(email:string, data: Partial<User>):Promise<User>;
}
