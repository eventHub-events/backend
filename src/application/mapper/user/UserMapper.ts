import { UserRegisterDTO } from '../../../domain/dtos/user/RegisterUserDTO';
import { UserResponseDTO } from '../../../domain/dtos/user/UserResponseDTO';
import { User } from '../../../domain/entities/User';

export class UserMapper {
  static toEntity(dto: UserRegisterDTO) :User {
    return {
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
      password: dto.password,
      isVerified: dto.isVerified ?? false,
      role: dto.role || 'user',
    };
  }
  // we use this method for converting the the dto  to entity for saving to  mongo db//

  static toDomain(raw: any) {
    return {
      id: raw._id?.toString(),
      name: raw.name,
      email: raw.email,
      phone: raw.phone,
      password: raw.password,
      isVerified: raw.isVerified,
      role: raw.role,
    };
  }

  // ----->convert raw database Object into  domain entity

  static toResponse(entity: User):UserResponseDTO {
    console.log(entity.email, entity.isVerified);
    return {
      id: entity.id ?? '',
      name: entity.name,
      email: entity.email,
      phone: entity.phone,
      isVerified: entity.isVerified,
      role: entity.role ?? 'user',
    };
  }

  // ---------------> converts entity into  response DTO
}
