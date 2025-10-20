import { UserRegisterDTO } from "../../../../../domain/DTOs/user/RegisterUserDTO";
import { UserResponseDTO } from "../../../../../domain/DTOs/user/UserResponseDTO";
import { User } from "../../../../../domain/entities/User";
import { IUserDocument } from "../../../../../infrastructure/db/models/user/UserModel";

export interface IUserMapper{
  toDomain(raw:IUserDocument):User;
  toEntity(dto:UserRegisterDTO):Partial<IUserDocument>;
  toResponse(user:User):UserResponseDTO
}