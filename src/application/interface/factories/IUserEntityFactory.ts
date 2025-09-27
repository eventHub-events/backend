
import { User } from "../../../domain/entities/User";
import { IUserDocument } from "../../../infrastructure/db/models/UserModel";

export interface IUserEntityFactory {
   toDomain(dbModel: IUserDocument & {_id: string}): User;
   toDomainList(dbModels: (IUserDocument & {_id: string})[]): User[]

}