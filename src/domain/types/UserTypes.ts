import { Types } from "mongoose";
import { IUserDocument } from "../../infrastructure/db/models/user/UserModel";
import { IUserProfileDocument } from "../../infrastructure/db/models/user/UserProfile";

export type UserDbModel = IUserDocument & {_id : string};
export type UserProfileDbModel = IUserProfileDocument & {_id : Types.ObjectId};