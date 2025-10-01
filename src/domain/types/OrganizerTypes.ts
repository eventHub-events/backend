import { IOrganizerProfile } from "../../infrastructure/db/models/organizer/profile/OrganizerProfile";
import { OrganizerProfile } from "../entities/organizer/OrganizerProfile";
import { User } from "../entities/User";

export type OrganizerProfileDbModel = IOrganizerProfile & {_id :string};

export type OrganizerProfileWithUser = {
 profile : OrganizerProfile;
 user      : User;

}