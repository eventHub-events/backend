import { CreateSubscriptionRequestRequestDTO } from "../../../DTOs/admin/subscription-plans/CreateSubscriptionRequestDTO";
import { SubscriptionResponseDTO } from "../../../DTOs/admin/subscription-plans/SubscriptionResponseDTO";
import { ISubscriptionPlansRepository } from "../../../../domain/repositories/admin/ISubscriptionPlansRepository";
import { ISubscriptionMapper } from "../../../interface/mapper/admin/ISubscriptionMapper";
import { ICreateSubscriptionPlanUseCase } from "../../../interface/useCases/admin/subscription-plans/ICreateSubscriptionUseCase";
import { SubscriptionPlans } from "../../../../infrastructure/constants/response-messages/admin/subscriptionPlans";

export class CreateSubscriptionPlanUseCase implements ICreateSubscriptionPlanUseCase {
  constructor(
        private _subscriptionRepo : ISubscriptionPlansRepository,
        private _subscriptionMapper: ISubscriptionMapper
  ){}

 async execute(dto: CreateSubscriptionRequestRequestDTO): Promise<SubscriptionResponseDTO> {

        const subscriptionEntity = this._subscriptionMapper.toEntity(dto);
        
        const  created = await this._subscriptionRepo.createSubscriptionPlans(subscriptionEntity);
        if(!created) throw new Error(SubscriptionPlans.SUBSCRIPTION_PLAN_FAILURE);

   return this._subscriptionMapper.toResponseDTO(created);

 }
}