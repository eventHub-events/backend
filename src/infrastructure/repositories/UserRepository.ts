import { FilterQuery } from 'mongoose';
import { ILoggerService } from '../../application/interface/common/ILoggerService';
import { IUserEntityFactory } from '../../application/interface/factories/user/IUserEntityFactory';
import { UserEntity } from '../../domain/entities/User';
import {
  IUserRepository,
  UserCountSummary,
} from '../../domain/repositories/user/IUserRepository';
import { UserDbModel } from '../../domain/types/UserTypes';
import UserModel, {
  IUserDocument,
  KycStatus,
} from '../db/models/user/UserModel';
import { BaseRepository } from './BaseRepository';
import { UserFilterOptions } from '../../application/DTOs/common/userFilterOptions';
import { ErrorMessages } from '../../constants/errorMessages';

export class UserRepository
  extends BaseRepository<IUserDocument>
  implements IUserRepository
{
  constructor(
    private _loggerService: ILoggerService,
    private _userEntityFactory: IUserEntityFactory<UserDbModel, UserEntity>
  ) {
    super(UserModel);
  }
  async createUser(user: UserEntity): Promise<UserEntity> {
    const userDoc = (await super.create(user)) as UserDbModel;

    return this._userEntityFactory.toDomain(userDoc);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const userDoc = (await super.findOne({ email })) as UserDbModel;
    return userDoc ? this._userEntityFactory.toDomain(userDoc) : null;
  }
  async findUserById(userId: string): Promise<UserEntity | null> {
    const userDoc = (await super.findById(userId)) as UserDbModel;

    return userDoc ? this._userEntityFactory.toDomain(userDoc) : null;
  }
  async verifyUser(email: string): Promise<UserEntity | null> {
    const userDoc = (await super.findOne({ email })) as UserDbModel;
    return userDoc ? this._userEntityFactory.toDomain(userDoc) : null;
  }
  async findAllWithFilter(
    filter: FilterQuery<UserEntity> = {}
  ): Promise<UserEntity[] | null> {
    const usersList = (await super.findAll(filter)) as UserDbModel[];

    return usersList ? this._userEntityFactory.toDomainList(usersList) : null;
  }

  async findAllUsers(
    filter: UserFilterOptions
  ): Promise<{ users: UserEntity[]; total: number } | null> {
    const { page = 1, limit = 5, search, role, status } = filter;

    const newFilter: FilterQuery<UserEntity> = {
      role: { $ne: 'admin' },
    };

    if (search) {
      newFilter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    if (role) {
      if (role === 'organizer') {
        newFilter.role = role;
      } else if (role === 'attendee') {
        newFilter.role = 'user';
      }
    }

    if (status === 'active') {
      newFilter.isBlocked = false;
    } else if (status === 'suspended') {
      newFilter.isBlocked = true;
    }

    const { data, total } = await this.paginate(newFilter, page, limit);

    const users = this._userEntityFactory.toDomainList(data as UserDbModel[]);
    return { users, total };
  }

  async updateUser(
    userId: string,
    data: Partial<UserEntity>
  ): Promise<UserEntity> {
    this._loggerService.info(`Updating user with ID: ${userId}`);
    const result = (await super.update(userId, data)) as UserDbModel;

    if (!result) {
      this._loggerService.error(`User with ID ${userId} not found`);
      throw new Error(`User with Id${userId} not found`);
    }

    this._loggerService.info(`User updated successfully: ${userId}`);
    return this._userEntityFactory.toDomain(result);
  }

  async UpdateUserByEmail(
    email: string,
    data: Partial<UserEntity>
  ): Promise<UserEntity> {
    this._loggerService.info(`Updating user with email: ${email}`);
    const result = (await super.findOneAndUpdate(
      { email },
      data
    )) as UserDbModel;

    if (!result) {
      this._loggerService.error(`User with email ${email} not found`);
      throw new Error(ErrorMessages.USER.USER_UPDATE_FAILURE);
    }

    return this._userEntityFactory.toDomain(result);
  }

  async getUserCountSummary(): Promise<UserCountSummary> {
    const [totalUsers, activeUsers, totalOrganizers, activeOrganizers] =
      await Promise.all([
        UserModel.countDocuments({ role: 'user' }),
        UserModel.countDocuments({ role: 'user', isBlocked: false }),
        UserModel.countDocuments({ role: 'organizer' }),
        UserModel.countDocuments({ role: 'organizer', isBlocked: false }),
      ]);

    return {
      totalUsers,
      activeUsers,
      totalOrganizers,
      activeOrganizers,
    };
  }
  async getPendingOrganizerVerification(): Promise<number> {
    return UserModel.countDocuments({
      role: 'organizer',
      isVerified: false,
      kycStatus: KycStatus.Pending,
    });
  }
  async getVerifiedOrganizers(): Promise<number> {
    return UserModel.countDocuments({
      role: 'organizer',
      isVerified: true,
    });
  }
}
