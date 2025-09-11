import { UserRegisterDTO } from '../../domain/dtos/user/RegisterUserDTO';
import { UserResponseDTO } from '../../domain/dtos/user/UserResponseDTO';
import { User } from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repositories/user/IUserRepository';
import UserModel, { IUserDocument } from '../db/models/UserModel';
import { BaseRepository } from './BaseRepository';
import { IUserUpdateDTO } from '../../domain/dtos/user/userUpdateDTO';
import { ILoggerService } from '../../application/interface/common/ILoggerService';
import { PaginationDTO } from '../../domain/dtos/common/PaginationDTO';
import { FilterQuery } from 'mongoose';
import { IUserMapper } from '../../application/interface/user/IUserMapper';
import { IUsersMapper } from '../../application/interface/user/IUsersMapper';


export class UserRepository extends BaseRepository<IUserDocument> implements IUserRepository {
  constructor(
    private _loggerService: ILoggerService,
    private _userMapper: IUserMapper,
    private _usersMapper: IUsersMapper 
  ) {
    super(UserModel);
  }

  async findByEmail(email: string): Promise<User | null> {
    const userDoc = await super.findOne({ email });
    return userDoc ? this._userMapper.toDomain(userDoc) : null;
  }

  async createUser(user: UserRegisterDTO): Promise<User> {
    const userDoc = await super.create(this._userMapper.toEntity(user));
    return this._userMapper.toDomain(userDoc);
  }

  async verifyUser(email: string): Promise<User | null> {
    const user = await super.findOne({ email });
    return user ? this._userMapper.toDomain(user) : null;
  }

  async findAllWithFilter(
    filter: FilterQuery<User> = {}
  ): Promise<{ users: Omit<UserResponseDTO, "phone" | "password">[] } | null> {
    const usersList = await super.findAll(filter);

    const users = usersList.map((user) => {
      const domainUser = this._userMapper.toDomain(user);
      return this._userMapper.toResponse(domainUser);
    });

    return { users };
  }

  async findAllUsers(
    pagination: PaginationDTO
  ): Promise<{ users: Omit<UserResponseDTO, "phone" | "password">[]; total: number } | null> {
    const { page = 1, limit = 5 } = pagination;
    const { data, total } = await this.paginate({ role: { $ne: "admin" } }, page, limit);

    if (data.length === 0) return null;

    const users = this._usersMapper.toResponse(data); 
    return { users, total };
  }

  async updateUser(id: string, data: IUserUpdateDTO): Promise<UserResponseDTO> {
    this._loggerService.info(`Updating user with ID: ${id}`);
    const result = await super.update(id, data);

    if (!result) {
      this._loggerService.error(`User with ID ${id} not found`);
      throw new Error("Error in updating UserData");
    }

    this._loggerService.info(`User updated successfully: ${id}`);
    const domainUser = this._userMapper.toDomain(result);
    return this._userMapper.toResponse(domainUser);
  }

  async updateUserData(email: string, data: IUserUpdateDTO): Promise<UserResponseDTO> {
    this._loggerService.info(`Updating user with email: ${email}`);
    const result = await super.findOneAndUpdate({ email }, data);

    if (!result) {
      this._loggerService.error(`User with email ${email} not found`);
      throw new Error("Error in updating password");
    }

    const domainUser = this._userMapper.toDomain(result);
    return this._userMapper.toResponse(domainUser);
  }
}
