
import { UserMapper } from '../../application/mapper/user/UserMapper';
import { UsersMapper } from '../../application/mapper/user/usersMapper';
import { UserRegisterDTO } from '../../domain/dtos/user/RegisterUserDTO';
import { UserResponseDTO } from '../../domain/dtos/user/UserResponseDTO';
import { User } from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repositories/user/IUserRepository';
import UserModel, { IUserDocument } from '../db/models/UserModel';
import { IUsersDocument } from '../interface/IUsersDocument';
import { BaseRepository } from './BaseRepository';
import { IUserUpdateDTO } from '../../domain/dtos/user/userUpdateDTO';
import { ILoggerService } from '../../application/interface/common/ILoggerService';
import { PaginationDTO } from '../../domain/dtos/common/PaginationDTO';

export class UserRepository extends BaseRepository<IUserDocument> implements IUserRepository {
  constructor(private _loggerService:ILoggerService) {
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
  async findAllUsers(pagination:PaginationDTO): Promise<{users:Omit<UserResponseDTO, "phone" | "password">[],total:number}|null>{

    const{page=1,limit=5}=pagination;
    const{data,total}=await this.paginate({role:{$ne:"admin"}},page,limit)

    if(data?.length===0) return null
    
      const users=UsersMapper.toResponse(data)
      
  
      
      return  {users,total}
  }
  async updateUser(id: string, data: IUserUpdateDTO): Promise<UserResponseDTO> {
  this._loggerService.info(`Updating user with ID:${id}`)
  const result = await super.update(id, data);
  
  if (!result) {
    this._loggerService.error(`User with Id ${id} not found`)
    throw new Error("Error in updating UserData");
  }
  this._loggerService.info(`User updated successfully :${id}`)
  const domainUser = UserMapper.toDomain(result);
  return UserMapper.toResponse(domainUser);
  }
  async updateUserData(email:string,data:IUserUpdateDTO):Promise<UserResponseDTO>{
    this._loggerService.info(`Updating user with email :${email}`)
    const result= await super.findOneAndUpdate({email},data)
    if(!result){
      this._loggerService.error(`User with email ${email} not found`)
      throw new Error("Error in updating password")
    }
    const domainUser=UserMapper.toDomain(result);
    return UserMapper.toResponse(domainUser)
  }
}
