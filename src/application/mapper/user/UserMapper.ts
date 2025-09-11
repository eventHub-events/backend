import { UserRegisterDTO } from '../../../domain/dtos/user/RegisterUserDTO';
import { UserResponseDTO } from '../../../domain/dtos/user/UserResponseDTO';
import { User } from '../../../domain/entities/User';
import { IUserDocument } from '../../../infrastructure/db/models/UserModel';
import { IUserMapper } from '../../interface/user/IUserMapper';

export class UserMapper  implements IUserMapper{
   toEntity(dto: UserRegisterDTO) :User {
    return {
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
      password: dto.password,
      isVerified: dto.isVerified ?? false,
      role: dto.role || 'user',
      isBlocked:dto.isBlocked,
      kycStatus:dto.kycStatus
    };
  }
  // we use this method for converting the the dto  to entity for saving to  mongo db//

   toDomain(raw: IUserDocument) {
    return {
      id: raw._id?.toString(),
      name: raw.name,
      email: raw.email,
      phone: raw.phone,
      password: raw.password,
      isVerified: raw.isVerified,
      role: raw.role,
      kycStatus:raw.kycStatus,
      isBlocked:raw.isBlocked,
      createdAt:raw.createdAt
    };
  }

  // ----->convert raw database Object into  domain entity

 toResponse(entity: User):UserResponseDTO {
    console.log(entity.email, entity.isVerified);
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

  // ---------------> converts entity into  response DTO
}
