
import { PaginationDTO } from "../../../domain/dtos/common/PaginationDTO";
import { UserResponseDTO } from "../../../domain/dtos/user/UserResponseDTO";

import { IUserUpdateDTO } from "../../../domain/dtos/user/userUpdateDTO";

export interface IFetchUserUseCase{
  fetchUsers(pagination:PaginationDTO):Promise<{users:Omit<UserResponseDTO, "phone" | "password">[],total:number}|null>
  updateUser(id:string,data:IUserUpdateDTO):Promise<UserResponseDTO |string> 
}