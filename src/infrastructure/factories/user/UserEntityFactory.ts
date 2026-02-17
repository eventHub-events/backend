import { IUserEntityFactory } from '../../../application/interface/factories/user/IUserEntityFactory';
import { UserEntity } from '../../../domain/entities/User';
import { UserDbModel } from '../../../domain/types/UserTypes';

export class UserEntityFactory implements IUserEntityFactory<
  UserDbModel,
  UserEntity
> {
  toDomain(dbModel: UserDbModel): UserEntity {
    return new UserEntity({
      name: dbModel.name,
      email: dbModel.email,
      password: dbModel.password,
      phone: dbModel.phone,
      isVerified: dbModel.isVerified,
      role: dbModel.role,
      kycStatus: dbModel.kycStatus,
      isBlocked: dbModel.isBlocked,
      isKycResubmitted: dbModel.isKycResubmitted,
      id: dbModel._id.toString(),
      hasPassword : dbModel.hasPassword,
      createdAt: dbModel.createdAt,
      stripeAccountId: dbModel.stripeAccountId,
      stripeOnboarded: dbModel.stripeOnboarded,
      isSubscribed: dbModel.isSubscribed,
      isProfileCompleted: dbModel.isProfileCompleted,
      isKycSubmitted:dbModel.isKycSubmitted,
      isStripeConnected:dbModel.isStripeConnected
    });
  }
  toDomainList(dbModel: UserDbModel[]): UserEntity[] {
    return dbModel.map(model => this.toDomain(model));
  }
}
