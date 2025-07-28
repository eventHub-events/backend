import { UserRegisterDTO } from "../../../domain/dtos/user/RegisterUserDTO";
import { User } from "../../../domain/entities/User";

export class UserMapper {
  static toEntity(dto: UserRegisterDTO) {
    return {
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
      password: dto.password,
      isVerified: false,
    };
  }
  // we use this method for converting the the dto  to entity for saving to  mongo db//

  static toDomain(raw: any) {
    return {
      id: raw._id?.toString(),
      name: raw.name,
      email: raw.name,
      phone: raw.phone,
      password: raw.password,
      isVerified: raw.isVerified,
    };
  }

  //----->convert raw database Object into  domain entity

  static toResponse(entity: User) {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      password: entity.password,
      isVerified: entity.isVerified,
    };
  }

  //---------------> converts entity into  response DTO

}
