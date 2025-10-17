import { ObjectId, Types } from "mongoose";
import { IEvent } from "../../infrastructure/db/models/organizer/events/EventsModel";
import { IOrganizerProfile } from "../../infrastructure/db/models/organizer/profile/OrganizerProfile";
import { OrganizerProfile } from "../entities/organizer/OrganizerProfile";
import { User } from "../entities/User";

export type OrganizerProfileDbModel = IOrganizerProfile & {_id :string};

export type OrganizerProfileWithUser = {
 profile : OrganizerProfile;
 user      : User;

}

export type EventsDbModel = IEvent & {_id: Types.ObjectId};