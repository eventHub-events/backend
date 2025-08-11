
import { Types } from "mongoose"
import { UserResponseDTO } from "../../../domain/dtos/user/UserResponseDTO"
import { IUsersDocument } from "../../../infrastructure/interface/IUsersDocument"








export  class UsersMapper{



  
static toResponse(users:IUsersDocument[]):Omit<UserResponseDTO, "phone" | "password">[]{
  const revised= users.map((user)=>({
    
  _id: user._id instanceof Types.ObjectId ? user._id.toString() : String(user._id),
   name:user.name,
   email:user.email,
   role:user.role,
   isBlocked:user.isBlocked,
   createdAt:user.createdAt!,
   
   
   })
  )
  return revised

}

}