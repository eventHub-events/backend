import { OrganizerSubscriptionEntity } from "../../entities/organizer/OrganizerSubscriptionEntity";

export interface IOrganizerSubscriptionRepository {
  createSubscription(entity: OrganizerSubscriptionEntity) : Promise<OrganizerSubscriptionEntity>;
  updateSubscription(entity: OrganizerSubscriptionEntity): Promise<OrganizerSubscriptionEntity>;
  fetchSubscriptionById(entity: OrganizerSubscriptionEntity) : Promise<OrganizerSubscriptionEntity>;

}