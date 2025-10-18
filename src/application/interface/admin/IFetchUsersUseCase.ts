import { PaginationDTO } from "../../../domain/DTOs/common/PaginationDTO";
import { UserResponseDTO } from "../../../domain/DTOs/user/UserResponseDTO";

import { IUserUpdateDTO } from "../../../domain/DTOs/user/userUpdateDTO";

export interface IFetchUserUseCase{
  fetchUsers(pagination:PaginationDTO):Promise<{users:Omit<UserResponseDTO, "phone" | "password">[],total:number}|null>
  updateUser(id:string,data:IUserUpdateDTO):Promise<UserResponseDTO |string> 
}