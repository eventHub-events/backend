import { UserResponseDTO } from "../../../domain/dtos/user/UserResponseDTO";
import { IUserDocument } from "../../../infrastructure/db/models/UserModel";
import { IUserMapper } from "../../interface/user/IUserMapper";
import { IUsersMapper } from "../../interface/user/IUsersMapper";

export  class UsersMapper implements IUsersMapper{
  constructor(private _userMapper:IUserMapper){}
  toResponse(users: IUserDocument[]): UserResponseDTO[] {
      return users.map((userDoc)=>{
        const domainUser=this._userMapper.toDomain(userDoc);
        const response= this._userMapper.toResponse(domainUser)
         return response
      })
  }

}