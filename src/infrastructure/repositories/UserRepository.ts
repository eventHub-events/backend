import { UserRegisterDTO } from '../../domain/dtos/user/RegisterUserDTO';
import { UserResponseDTO } from '../../domain/dtos/user/UserResponseDTO';
import { User } from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repositories/user/IUserRepository';
import UserModel, { IUserDocument } from '../db/models/UserModel';
import { BaseRepository } from './BaseRepository';
import { ILoggerService } from '../../application/interface/common/ILoggerService';
import { PaginationDTO } from '../../domain/dtos/common/PaginationDTO';
import { FilterQuery } from 'mongoose';
import { IUserMapper } from '../../application/interface/user/IUserMapper';
import { IUsersMapper } from '../../application/interface/user/IUsersMapper';
import { CustomError } from '../errors/errorClass';
import { HttpStatusCode } from '../interface/enums/HttpStatusCode';

import { IDomainFactory } from '../../application/interface/factories/IDomainFactory';
import { UserDbModel } from '../../domain/types/UserTypes';


export class UserRepository extends BaseRepository<IUserDocument> implements IUserRepository {
  constructor(
    private _loggerService: ILoggerService,
    private _userMapper: IUserMapper,
    private _usersMapper: IUsersMapper,
    private _userEntityFactory: IDomainFactory< UserDbModel, User>
  ) {
    super(UserModel);
  }

  async findByEmail(email: string): Promise< User | null> {
    const userDoc = await super.findOne({ email }) as IUserDocument & {_id : string}
    //  return userDoc ? this._userMapper.toDomain(userDoc) : null;
     return userDoc? this._userEntityFactory.toDomain(userDoc): null ;
  }
  async findUserById(id: string): Promise< User| null> {
    console.log("ID ",id)
      const userDoc=await super.findById(id) as UserDbModel;
      console.log("usreee doc",userDoc);
      if(userDoc){
        return this._userEntityFactory.toDomain(userDoc)
      }
      return null
  }

  async createUser(user: UserRegisterDTO): Promise<User> {
    const userDoc = await super.create(user);
    return userDoc
  }

  async verifyUser(email: string): Promise<User | null> {
    const user = await super.findOne({ email });
    return user ? user :null;
    
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
    const { page = 1, limit = 5 ,search,role,status} = pagination;
    const filter:FilterQuery<User>={
      role:{$ne:"admin"},

    };
    if(search){
        filter.$or=[
          {name:{$regex:search,$options:"i"}},
          {email:{$regex:search,$options:"i"}},
        ]
    }
    if(role){
      if(role==="organizer"){

        filter.role=role;
      }else if(role==="attendee"){
         filter.role="user"
      }
    }
    if(status === "active"){
      filter.isBlocked=false;
    }else if(status==="suspended"){
      filter.isBlocked = true;
    }
    const { data, total } = await this.paginate(filter, page, limit);

    const users = this._usersMapper.toResponse(data); 
    return { users, total };
  }

  async updateUser(id: string, data: Partial< User >): Promise< User> {

    this._loggerService.info(`Updating user with ID: ${id}`);
    const result = await super.update(id, data) as UserDbModel;

    if (!result) {
      this._loggerService.error(`User with ID ${id} not found`);
      throw new CustomError(`User with Id${id} not found`,HttpStatusCode.NOT_FOUND);
    }

    this._loggerService.info(`User updated successfully: ${id}`);
    return this._userEntityFactory.toDomain(result);

    
  }

  async updateUserData(email: string, data: Partial<User>): Promise<User> {
    this._loggerService.info(`Updating user with email: ${email}`);
    const result = await super.findOneAndUpdate({ email }, data) as IUserDocument & {_id : string};

    if (!result) {
      this._loggerService.error(`User with email ${email} not found`);
      throw new CustomError("Error in updating password",HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
    return this._userEntityFactory.toDomain(result)
   

  }
}
