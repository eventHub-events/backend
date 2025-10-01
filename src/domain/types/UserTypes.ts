import { IUserDocument } from "../../infrastructure/db/models/UserModel";

export type UserDbModel = IUserDocument & {_id : string};