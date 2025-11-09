import { OrganizerSubscriptionEntity } from "../../../domain/entities/organizer/OrganizerSubscriptionEntity";
import { IOrganizerSubscriptionRepository } from "../../../domain/repositories/organizer/IOrganizerSubscriptionRepository";
import { IOrganizerSubscription, OrganizerSubscriptionModel } from "../../db/models/organizer/subscription/OrganizerSubcriptionModel";
import { BaseRepository } from "../BaseRepository";

export class OrganizerSubscriptionRepository extends BaseRepository<IOrganizerSubscription> implements IOrganizerSubscriptionRepository {

   constructor(){
     super(OrganizerSubscriptionModel)
   }
  createSubscription(entity: OrganizerSubscriptionEntity): Promise<OrganizerSubscriptionEntity> {
      
  }
  updateSubscription(entity: OrganizerSubscriptionEntity): Promise<OrganizerSubscriptionEntity> {
      
  }
  fetchSubscriptionById(entity: OrganizerSubscriptionEntity): Promise<OrganizerSubscriptionEntity> {
      
  }
}