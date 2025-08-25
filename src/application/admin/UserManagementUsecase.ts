
import { UserResponseDTO } from "../../domain/dtos/user/UserResponseDTO";
import { IUserRepository } from "../../domain/repositories/user/IUserRepository";

import {  IUserManagementUseCase } from "../interface/admin/IUserManagementUseCase";

import { HandleErrorUtility } from "../../utils/HandleErrorUtility";
import { IUserUpdateDTO } from "../../domain/dtos/user/userUpdateDTO";

export class UserManagementUseCase implements IUserManagementUseCase{
  constructor(private _userRepo:IUserRepository){}
  async fetchUsers(): Promise<Omit<UserResponseDTO,"phone" |"password">[]> {
    try{
      const usersList= await this._userRepo.findAllUsers()
      if(!usersList) throw new Error("Error in  fetching user")
        return usersList
        
    }catch(err:unknown){
       
       throw HandleErrorUtility.handleError(err)
    }
  }
async updateUser(id: string,data:IUserUpdateDTO):Promise<UserResponseDTO>  {
      try{
        console.log(id,data)
        const result= await this._userRepo.updateUser(id,data)
        console.log("result is ",result)
        return result
        
      }catch (err:unknown){
         throw HandleErrorUtility.handleError(err)
         
      }
  }
}