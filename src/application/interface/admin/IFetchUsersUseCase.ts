
import { UserResponseDTO } from "../../../domain/dtos/user/UserResponseDTO";

import { IUserUpdateDTO } from "../../../domain/dtos/user/userUpdateDTO";

export interface IFetchUserUseCase{
  fetchUsers():Promise<Omit<UserResponseDTO, "phone" | "password">[]|null>
  updateUser(id:string,data:IUserUpdateDTO):Promise<UserResponseDTO |string> 
}