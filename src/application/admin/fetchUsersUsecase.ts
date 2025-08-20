
import { UserResponseDTO } from "../../domain/dtos/user/UserResponseDTO";
import { IUserRepository } from "../../domain/repositories/user/IUserRepository";

import { IFetchUserUseCase } from "../interface/admin/IFetchUsersUseCase";

import { HandleErrorUtility } from "../../utils/HandleErrorUtility";
import { IUserUpdateDTO } from "../../domain/dtos/user/userUpdateDTO";

export class FetchUserUseCase implements IFetchUserUseCase{
  constructor(private _userRepo:IUserRepository){}
  async fetchUsers(): Promise<Omit<UserResponseDTO,"phone" |"password">[]| null> {
    try{
      const usersList= await this._userRepo.findAllUsers()
      if(!usersList) throw new Error("Error in  fetching user")
        return usersList
        
    }catch(err:unknown){
       
       return null
    }
  }
async updateUser(id: string,data:IUserUpdateDTO):Promise<UserResponseDTO|string>  {
      try{
        console.log(id,data)
        const result= await this._userRepo.updateUser(id,data)
        console.log("result is ",result)
        return result
        
      }catch (err:unknown){
         const error=HandleErrorUtility.handleError(err)
         return  error
      }
  }
}