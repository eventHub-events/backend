import { IDomainFactory } from "../../application/interface/factories/IDomainFactory";
import { User } from "../../domain/entities/User";
import { UserDbModel } from "../../domain/types/UserTypes";


export class UserEntityFactory implements IDomainFactory< UserDbModel, User> {
  toDomain(dbModel: UserDbModel): User{
    return new User(
      dbModel.name,
      dbModel.email,
      dbModel.password,
      dbModel.phone,
      dbModel.isVerified,
      dbModel.role,
      dbModel.kycStatus,
      dbModel.isBlocked,
      dbModel.isKycResubmitted,
      dbModel._id?.toString(),
      dbModel.createdAt,
    )
  }
  toDomainList(dbModels: (UserDbModel)[]): User[] {
      return dbModels.map((model) => this.toDomain(model))
  }
}