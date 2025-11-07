import { UserRegisterDTO } from '../../DTOs/user/RegisterUserDTO';
import { UserResponseDTO } from '../../DTOs/user/UserResponseDTO';
import {  UserEntity } from '../../../domain/entities/User';
import { IUserMapper } from '../../interface/useCases/user/mapper/IUserMapper';



export class  UserMapper implements IUserMapper {
  toEntity(dto: UserRegisterDTO): UserEntity {
     
       return new UserEntity({
           name: dto.name,
           email: dto.email,
           phone: dto.phone,
           password: dto.password,
            isVerified: dto.isVerified ?? false,
          role: dto.role || 'user',
          isBlocked:dto.isBlocked,
          kycStatus:dto.kycStatus,
          isKycResubmitted :dto.isKycResubmitted
       })
   }
   toResponseDTO(entity: UserEntity): UserResponseDTO {
       return {
      id: entity.id ?? '',
      name: entity.name,
      email: entity.email,
      phone: entity.phone,
      isVerified: entity.isVerified,
      role: entity.role ?? 'user',
      isBlocked:entity.isBlocked,
      kycStatus:entity.kycStatus,
      createdAt:entity.createdAt
    };
   }
  toResponseDTOForAdmin(entity: UserEntity): UserResponseDTO {
        return {
      id: entity.id ?? '',
      name: entity.name,
      email: entity.email,
      isVerified: entity.isVerified,
      role: entity.role ?? 'user',
      isBlocked:entity.isBlocked,
      kycStatus:entity.kycStatus,
      createdAt:entity.createdAt
  }
}
  toResponseDTOListForAdmin(entity: UserEntity[]): UserResponseDTO[] {
      
    return entity.map(((e) => this.toResponseDTOForAdmin(e)));
  }
  }

