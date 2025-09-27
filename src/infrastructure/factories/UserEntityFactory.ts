import { IDomainFactory } from "../../application/interface/factories/IDomainFactory";
import { User } from "../../domain/entities/User";
import { IUserDocument } from "../db/models/UserModel";

export class UserEntityFactory implements IDomainFactory< IUserDocument, User> {
  toDomain(dbModel: IUserDocument & {_id :string}): User{
    return {
        id: dbModel._id?.toString(),
      name: dbModel.name,
      email: dbModel.email,
      phone: dbModel.phone,
      password: dbModel.password,
      isVerified: dbModel.isVerified,
      role: dbModel.role,
      kycStatus:dbModel.kycStatus,
      isBlocked:dbModel.isBlocked,
      createdAt:dbModel.createdAt,
      isKycResubmitted : dbModel.isKycResubmitted
    }
  }
  toDomainList(dbModels: (IUserDocument & {_id: string})[]): User[] {
      return dbModels.map((model) => this.toDomain(model))
  }
}