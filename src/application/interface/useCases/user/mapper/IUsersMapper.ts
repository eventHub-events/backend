import { UserResponseDTO } from "../../../../../domain/DTOs/user/UserResponseDTO";
import { IUserDocument } from "../../../../../infrastructure/db/models/user/UserModel";

export interface IUsersMapper{
  toResponse(users:IUserDocument[]):UserResponseDTO[]
}