

import { UserRegisterDTO } from "../../../../DTOs/user/RegisterUserDTO";
import { UserResponseDTO } from "../../../../DTOs/user/UserResponseDTO";
import { UserEntity } from "../../../../../domain/entities/User";





export interface IUserMapper {
  toEntity(dto: UserRegisterDTO) : UserEntity;
  toResponseDTO(entity: UserEntity): UserResponseDTO;
  toResponseDTOForAdmin(entity: UserEntity): UserResponseDTO;
  toResponseDTOListForAdmin(entity: UserEntity[]): UserResponseDTO[];

}