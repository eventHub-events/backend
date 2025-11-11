import { OrganizerSubscriptionEntity } from "../../entities/organizer/OrganizerSubscriptionEntity";
import { SubscriptionStatus } from "../../enums/organizer/subscription";

export interface IOrganizerSubscriptionRepository {
  createSubscription(entity: OrganizerSubscriptionEntity) : Promise<OrganizerSubscriptionEntity>;
  updateSubscription(subscriptionId: string, entity: OrganizerSubscriptionEntity): Promise<OrganizerSubscriptionEntity>;
  fetchSubscriptionById(organizerId: string,status?: SubscriptionStatus) : Promise<OrganizerSubscriptionEntity>;
  fetchExpiredSubscription(currentDate: Date): Promise< OrganizerSubscriptionEntity[] > 

}