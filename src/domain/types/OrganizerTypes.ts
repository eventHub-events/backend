import { Types } from 'mongoose';
import { IEvent } from '../../infrastructure/db/models/organizer/events/EventsModel';
import { IOrganizerProfile } from '../../infrastructure/db/models/organizer/profile/OrganizerProfile';
import { OrganizerProfile } from '../entities/organizer/OrganizerProfile';
import { UserEntity } from '../entities/User';
import { IEventTicketing } from '../../infrastructure/db/models/organizer/events/EventTicketingModel';
import { IOrganizerSubscription } from '../../infrastructure/db/models/organizer/subscription/OrganizerSubscriptionModel';

export type OrganizerProfileDbModel = IOrganizerProfile & { _id: string };

export type OrganizerProfileWithUser = {
  profile: OrganizerProfile;
  user: UserEntity;
};

export type EventsDbModel = IEvent & { _id: Types.ObjectId };

export type EventTicketingDbModel = IEventTicketing & { _id: Types.ObjectId };

export type OrganizerSubscriptionDbModel = IOrganizerSubscription & {
  _id: Types.ObjectId;
};
