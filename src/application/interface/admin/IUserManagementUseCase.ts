
import { PaginationDTO } from "../../../domain/dtos/common/PaginationDTO";
import { UserResponseDTO } from "../../../domain/dtos/user/UserResponseDTO";

import { IUserUpdateDTO } from "../../../domain/dtos/user/userUpdateDTO";

<<<<<<< HEAD:src/application/interface/admin/IFetchUsersUseCase.ts
export interface IFetchUserUseCase{
  fetchUsers(pagination:PaginationDTO):Promise<{users:Omit<UserResponseDTO, "phone" | "password">[],total:number}|null>
  updateUser(id:string,data:IUserUpdateDTO):Promise<UserResponseDTO |string> 
=======
export interface IUserManagementUseCase{
  fetchUsers():Promise<Omit<UserResponseDTO, "phone" | "password">[]>
  updateUser(id:string,data:IUserUpdateDTO):Promise<UserResponseDTO > 
>>>>>>> feature/organizer/profile:src/application/interface/admin/IUserManagementUseCase.ts
}