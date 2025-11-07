import {  UserFilterOptions } from "../../../DTOs/common/userFilterOptions";
import { UserResponseDTO } from "../../../DTOs/user/UserResponseDTO";

import { IUserUpdateDTO } from "../../../DTOs/user/userUpdateDTO";

export interface IFetchUserUseCase{
  fetchUsers(userFilters: UserFilterOptions): Promise<{usersList: UserResponseDTO[], total:number}>;
  updateUser(id:string,data:IUserUpdateDTO):Promise<UserResponseDTO > 
}