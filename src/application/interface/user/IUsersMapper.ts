import { UserResponseDTO } from "../../../domain/dtos/user/UserResponseDTO";
import { IUserDocument } from "../../../infrastructure/db/models/UserModel";

export interface IUsersMapper{
  toResponse(users:IUserDocument[]):UserResponseDTO[]
}