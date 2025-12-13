import { UserResponseDTO } from '../../../../DTOs/user/UserResponseDTO';
import { IUserDocument } from '../../../../../infrastructure/db/models/user/UserModel';

export interface IUsersMapper {
  toResponse(users: IUserDocument[]): UserResponseDTO[];
}
