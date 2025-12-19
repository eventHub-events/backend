import { UserResponseDTO } from '../../DTOs/user/UserResponseDTO';
import { IUserRepository } from '../../../domain/repositories/user/IUserRepository';
import { IUserUpdateDTO } from '../../DTOs/user/userUpdateDTO';
import { UserFilterOptions } from '../../DTOs/common/userFilterOptions';
import { IFetchUserUseCase } from '../../interface/useCases/admin/IFetchUsersUseCase';
import { IUserMapper } from '../../interface/useCases/user/mapper/IUserMapper';
import { UserEntity } from '../../../domain/entities/User';
import { ErrorMessages } from '../../../constants/errorMessages';

export class FetchUserUseCase implements IFetchUserUseCase {
  constructor(
    private _userRepo: IUserRepository,
    private _userMapper: IUserMapper
  ) {}
  async fetchUsers(
    userFilters: UserFilterOptions
  ): Promise<{ usersList: UserResponseDTO[]; total: number }> {
    const usersEntity = await this._userRepo.findAllUsers(userFilters);
    if (!usersEntity) throw new Error(ErrorMessages.USER.NOT_FOUND);

    const { users, total } = usersEntity;
    const usersList = this._userMapper.toResponseDTOListForAdmin(users);
    return { usersList, total };
  }
  async updateUser(
    userId: string,
    data: IUserUpdateDTO
  ): Promise<UserResponseDTO> {
    const result = await this._userRepo.updateUser(
      userId,
      data as Partial<UserEntity>
    );

    return this._userMapper.toResponseDTOForAdmin(result);
  }
}
