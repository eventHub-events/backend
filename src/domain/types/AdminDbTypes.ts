import { Types } from "mongoose";
import { ICategoryDocument } from "../../infrastructure/db/models/admin/CategoryModel";
import { IEventModeration } from "../../infrastructure/db/models/organizer/events/EventModerationModel";
import { ISubscriptionPlans } from "../../infrastructure/db/models/admin/SubScriptionPlansModel";

export type categoryDbModel = ICategoryDocument &{_id: string};

export type EventModerationDbModel = IEventModeration & {_id : Types.ObjectId};
export type SubscriptionPlansDbModel = ISubscriptionPlans & {_id :Types.ObjectId};