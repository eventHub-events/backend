import { UserMapper } from '../../application/mapper/user/UserMapper';
import { UserRegisterDTO } from '../../domain/dtos/user/RegisterUserDTO';
import { User } from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repositories/user/IUserRepository';
import UserModel, { IUserDocument } from '../db/models/UserModel';
import { BaseRepository } from './BaseRepository';

export class UserRepository extends BaseRepository<IUserDocument> implements IUserRepository {
  constructor() {
    // ======>Injecting the UserModel into the BaseRepository (Dependency Injection)
    super(UserModel);
  }

  async findByEmail(email:string):Promise<User | null > {
    const userDoc = await UserModel.findOne({ email });
    return userDoc ? UserMapper.toDomain(userDoc) : null;
  }

  async createUser(user: UserRegisterDTO): Promise<User> {
    const userDoc = await UserModel.create(UserMapper.toEntity(user));
    return UserMapper.toDomain(userDoc);
  }

  async verifyUser(email:string): Promise<User> {
     const user= await UserModel.findOne({email})
     return UserMapper.toEntity(user)
  }
}
