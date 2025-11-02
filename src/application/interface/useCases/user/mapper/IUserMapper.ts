

import { UserRegisterDTO } from "../../../../../domain/DTOs/user/RegisterUserDTO";
import { UserResponseDTO } from "../../../../../domain/DTOs/user/UserResponseDTO";
import { UserEntity } from "../../../../../domain/entities/User";





export interface IUserMapper {
  toEntity(dto: UserRegisterDTO) : UserEntity;
  toResponseDTO(entity: UserEntity): UserResponseDTO;
  toResponseDTOForAdmin(entity: UserEntity): UserResponseDTO;
  toResponseDTOListForAdmin(entity: UserEntity[]): UserResponseDTO[];

}