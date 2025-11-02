import {  UserFilterOptions } from "../../../../domain/DTOs/common/userFilterOptions";
import { UserResponseDTO } from "../../../../domain/DTOs/user/UserResponseDTO";

import { IUserUpdateDTO } from "../../../../domain/DTOs/user/userUpdateDTO";

export interface IFetchUserUseCase{
  fetchUsers(userFilters: UserFilterOptions): Promise<{usersList: UserResponseDTO[], total:number}>;
  updateUser(id:string,data:IUserUpdateDTO):Promise<UserResponseDTO > 
}