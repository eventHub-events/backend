import { IOrganizerSubscriptionEntityFactory } from "../../../application/interface/factories/organizer/IOrganizerSubscriptionEntityFactory";
import { OrganizerSubscriptionEntity } from "../../../domain/entities/organizer/OrganizerSubscriptionEntity";
import { SubscriptionStatus } from "../../../domain/enums/organizer/subscription";
import { IOrganizerSubscriptionRepository } from "../../../domain/repositories/organizer/IOrganizerSubscriptionRepository";
import { OrganizerSubscriptionDbModel } from "../../../domain/types/OrganizerTypes";
import { IOrganizerSubscription, OrganizerSubscriptionModel } from "../../db/models/organizer/subscription/OrganizerSubscriptionModel";
import { BaseRepository } from "../BaseRepository";

export class OrganizerSubscriptionRepository extends BaseRepository<IOrganizerSubscription> implements IOrganizerSubscriptionRepository {

   constructor(
         private _SubscriptionEntityFactory : IOrganizerSubscriptionEntityFactory
   ){
     super(OrganizerSubscriptionModel)
   }
 async createSubscription(entity: OrganizerSubscriptionEntity): Promise<OrganizerSubscriptionEntity> {

      const created =  await super.create(entity) as OrganizerSubscriptionDbModel;
  return this._SubscriptionEntityFactory.toDomain(created);

  }
 async  updateSubscription(subscriptionId: string, entity: OrganizerSubscriptionEntity): Promise<OrganizerSubscriptionEntity> {

       const updated = await super.update(subscriptionId, entity) as OrganizerSubscriptionDbModel;
    return this._SubscriptionEntityFactory.toDomain(updated);
  }
  
  async fetchSubscriptionById(organizerId: string, status: SubscriptionStatus): Promise<OrganizerSubscriptionEntity> {

      const fetched = await super.findOne({organizerId, status}) as OrganizerSubscriptionDbModel;
  return this._SubscriptionEntityFactory.toDomain(fetched);

  }
}