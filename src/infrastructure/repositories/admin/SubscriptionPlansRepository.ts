
import { ISubscriptionEntityFactory } from "../../../application/interface/factories/admin/ISubscriptionEntityFactory";
import { SubscriptionPlansEntity } from "../../../domain/entities/admin/SubscriptionPlansEntity";
import { ISubscriptionPlansRepository } from "../../../domain/repositories/admin/ISubscriptionPlansRepository";
import { SubscriptionPlansDbModel } from "../../../domain/types/AdminDbTypes";
import { ISubscriptionPlans, subscriptionPlansModel } from "../../db/models/admin/SubscriptionPlansModel";
import { BaseRepository } from "../BaseRepository";

export  class SubscriptionPlansRepository extends BaseRepository<ISubscriptionPlans> implements ISubscriptionPlansRepository {
      constructor( 
            private _subscriptionEntityFactory : ISubscriptionEntityFactory<SubscriptionPlansDbModel, SubscriptionPlansEntity>
          
      ){ 
          super(subscriptionPlansModel)
      }
 async createSubscriptionPlans(entity: SubscriptionPlansEntity): Promise<SubscriptionPlansEntity> {

        const subscriptionDoc = await super.create(entity) as SubscriptionPlansDbModel;
    return this._subscriptionEntityFactory.toDomain(subscriptionDoc)
 }
 async updateSubscriptionPlans(subscriptionId: string, data: SubscriptionPlansEntity): Promise<SubscriptionPlansEntity> {

     const updated = await super.update(subscriptionId,data) as SubscriptionPlansDbModel;
  return this._subscriptionEntityFactory.toDomain(updated)
 }
  async fetchSubscriptionPlanById(subscriptionId: string): Promise<SubscriptionPlansEntity> {
    
      const fetchedData = await super.findById(subscriptionId) as SubscriptionPlansDbModel;
   return this._subscriptionEntityFactory.toDomain(fetchedData);
  }
  async fetchSubscriptionPlans( filter?: Partial<SubscriptionPlansEntity>) :  Promise<SubscriptionPlansEntity[]> {
                const filterOption = filter?filter:{};
          const fetchedPlans = await super.findAll(filterOption) as SubscriptionPlansDbModel[];
    return this._subscriptionEntityFactory.toDomainList(fetchedPlans);
  }

}