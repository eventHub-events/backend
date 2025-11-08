import { ISubscriptionPlansRepository } from "../../../../domain/repositories/admin/ISubscriptionPlansRepository";
import { SubscriptionPlans } from "../../../../infrastructure/constants/response-messages/admin/subscriptionPlans";
import { SubscriptionResponseDTO } from "../../../DTOs/admin/subscription-plans/SubscriptionResponseDTO";
import { ISubscriptionMapper } from "../../../interface/mapper/admin/ISubscriptionMapper";
import { IFetchSubscriptionPlansUseCase } from "../../../interface/useCases/admin/subscription-plans/IFetchSubscriptionPlansUseCase";

export class FetchSubscriptionPlansUseCase  implements IFetchSubscriptionPlansUseCase{
  constructor(
        private _subscriptionPlansRepo : ISubscriptionPlansRepository,
        private _subscriptionPlansMapper : ISubscriptionMapper
    ){}

 async execute() : Promise<SubscriptionResponseDTO[]> {

       const subscriptionEntity = await this._subscriptionPlansRepo.fetchSubscriptionPlans();
       console.log("suubscriptionplans", subscriptionEntity)
       if(!subscriptionEntity) throw new Error(SubscriptionPlans.SUBSCRIPTION_PLANS_FETCH_SUCCESS);
    
       return this._subscriptionPlansMapper.toResponseDTOList(subscriptionEntity);
    
  }

}