import { Types } from "mongoose";
import { IUserDocument } from "../../infrastructure/db/models/user/UserModel";
import { IUserProfileDocument } from "../../infrastructure/db/models/user/UserProfile";
import { IBooking } from "../../infrastructure/db/models/user/BookingModel";
import { IEventReview } from "../../infrastructure/db/models/user/EventReviewModel";

export type UserDbModel = IUserDocument & {_id : string};
export type UserProfileDbModel = IUserProfileDocument & {_id : Types.ObjectId};
export type BookingDbModel = IBooking & {_id: Types.ObjectId} & {createdAt: Date};
export type EventReviewModel = IEventReview & {_id: Types.ObjectId};