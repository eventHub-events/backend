// import { UserResponseDTO } from '../../DTOs/user/UserResponseDTO';
// import { IUserDocument } from '../../../infrastructure/db/models/user/UserModel';
// import { IUserMapper } from '../../interface/useCases/user/mapper/IUserMapper';
// import { IUsersMapper } from '../../interface/useCases/user/mapper/IUsersMapper';
// import { UserEntity } from '../../../domain/entities/User';

// export class UsersMapper implements IUsersMapper {
//   constructor(private _userMapper: IUserMapper) {}
//   toResponse(users: UserEntity[]): UserResponseDTO[] {
//     return users.map(userDoc => {
//       const domainUser = this._userMapper.toEntity(userDoc);
//       const response = this._userMapper.toResponseDTO(domainUser);
//       return response;
//     });
//   }
// }
