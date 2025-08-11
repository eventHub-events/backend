import { UserMapper } from '../../application/mapper/user/UserMapper';
import { UsersMapper } from '../../application/mapper/user/usersMapper';
import { UserRegisterDTO } from '../../domain/dtos/user/RegisterUserDTO';
import { UserResponseDTO } from '../../domain/dtos/user/UserResponseDTO';
import { User } from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repositories/user/IUserRepository';
import UserModel, { IUserDocument } from '../db/models/UserModel';
import { IUsersDocument } from '../interface/IUsersDocument';
import { BaseRepository } from './BaseRepository';

export class UserRepository extends BaseRepository<IUserDocument> implements IUserRepository {
  constructor() {
    // ======>Injecting the UserModel into the BaseRepository (Dependency Injection)=====//
    super(UserModel);
  }

  async findByEmail(email:string):Promise<User | null > {
    const userDoc = await super.findOne({ email });
    return userDoc ? UserMapper.toDomain(userDoc) : null;
  }

  async createUser(user: UserRegisterDTO): Promise<User> {
    const userDoc = await super.create(UserMapper.toEntity(user));
    return UserMapper.toDomain(userDoc);
  }

  async verifyUser(email:string): Promise<User|null> {
     const user= await super.findOne({email});
     if(!user)return null
     return UserMapper.toDomain(user)
  }
  async findAllUsers(): Promise<Omit<UserResponseDTO, "phone" | "password">[]|null>{
      const users:IUsersDocument[]=await super.findAll({role:{$ne:"admin"}})
      if(users.length===0) return null
      return UsersMapper.toResponse(users)
  }
}
