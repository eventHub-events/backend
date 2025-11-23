import { Types } from "mongoose";
import { IUserDocument } from "../../infrastructure/db/models/user/UserModel";
import { IUserProfileDocument } from "../../infrastructure/db/models/user/UserProfile";
import { IBooking } from "../../infrastructure/db/models/user/BookingModel";
import { IEventReview } from "../../infrastructure/db/models/user/EventReviewModel";
import { IOrganizerReview } from "../../infrastructure/db/models/organizer/profile/OrganizerReviewModel";

export type UserDbModel = IUserDocument & {_id : string};
export type UserProfileDbModel = IUserProfileDocument & {_id : Types.ObjectId};
export type BookingDbModel = IBooking & {_id: Types.ObjectId} & {createdAt: Date};
export type EventReviewDBModel = IEventReview & {_id: Types.ObjectId};
export type OrganizerReviewModel = IOrganizerReview & {_id: Types.ObjectId};