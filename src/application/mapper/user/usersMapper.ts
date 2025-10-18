import { UserResponseDTO } from "../../../domain/DTOs/user/UserResponseDTO";
import { IUserDocument } from "../../../infrastructure/db/models/user/UserModel";
import { IUserMapper } from "../../interface/user/mapper/IUserMapper";
import { IUsersMapper } from "../../interface/user/mapper/IUsersMapper";

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