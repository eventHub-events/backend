
import { UserResponseDTO } from "../../../domain/dtos/user/UserResponseDTO";

import { IUserUpdateDTO } from "../../../domain/dtos/user/userUpdateDTO";

export interface IUserManagementUseCase{
  fetchUsers():Promise<Omit<UserResponseDTO, "phone" | "password">[]>
  updateUser(id:string,data:IUserUpdateDTO):Promise<UserResponseDTO > 
}