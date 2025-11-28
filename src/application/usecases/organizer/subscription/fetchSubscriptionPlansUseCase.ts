import { NotFoundError } from "../../../../domain/errors/common";
import { ISubscriptionPlansRepository } from "../../../../domain/repositories/admin/ISubscriptionPlansRepository";
import { Subscription } from "../../../../infrastructure/constants/response-messages/organizer/subscription";
import { SubscriptionResponseDTO } from "../../../DTOs/admin/subscription-plans/SubscriptionResponseDTO";
import { ISubscriptionMapper } from "../../../interface/mapper/admin/ISubscriptionMapper";
import { IFetchSubscriptionPlansForOrganizerUseCase } from "../../../interface/useCases/organizer/subscription/IFetchSubscriptionPlansUseCase";

export class FetchSubscriptionPlansForOrganizerUseCase implements IFetchSubscriptionPlansForOrganizerUseCase {
  constructor(
         private _subscriptionPlansRepo : ISubscriptionPlansRepository,
         private _subscriptionPlansMapper : ISubscriptionMapper
     ){}
 
  async execute() : Promise<SubscriptionResponseDTO[]> {
 
        const subscriptionEntity = await this._subscriptionPlansRepo.fetchSubscriptionPlans({isActive:true});
      
        if(!subscriptionEntity) throw new NotFoundError(Subscription.SUBSCRIPTION_PLANS_FAILURE);
     
        return this._subscriptionPlansMapper.toResponseDTOList(subscriptionEntity);
     
   }
}