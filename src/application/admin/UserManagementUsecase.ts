
import { UserResponseDTO } from "../../domain/dtos/user/UserResponseDTO";
import { IUserRepository } from "../../domain/repositories/user/IUserRepository";

import {  IUserManagementUseCase } from "../interface/admin/IUserManagementUseCase";

import { HandleErrorUtility } from "../../utils/HandleErrorUtility";
import { IUserUpdateDTO } from "../../domain/dtos/user/userUpdateDTO";
import { PaginationDTO } from "../../domain/dtos/common/PaginationDTO";

export class UserManagementUseCase implements IUserManagementUseCase{
  constructor(private _userRepo:IUserRepository){}
<<<<<<< HEAD:src/application/admin/fetchUsersUsecase.ts
  async fetchUsers(pagination:PaginationDTO): Promise<{users:Omit<UserResponseDTO, "phone" | "password">[],total:number}|null> {
=======
  async fetchUsers(): Promise<Omit<UserResponseDTO,"phone" |"password">[]> {
>>>>>>> feature/organizer/profile:src/application/admin/UserManagementUsecase.ts
    try{
      const usersList= await this._userRepo.findAllUsers(pagination)
      if(!usersList) throw new Error("Error in  fetching user")
        const{users,total}=usersList
        return {users,total}
        
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