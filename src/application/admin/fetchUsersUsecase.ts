import { UserResponseDTO } from "../../domain/dtos/user/UserResponseDTO";
import { IUserRepository } from "../../domain/repositories/user/IUserRepository";
import { IUsersDocument } from "../../infrastructure/interface/IUsersDocument";
import { IFetchUserUseCase } from "../interface/admin/IFetchUsersUseCase";

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
}