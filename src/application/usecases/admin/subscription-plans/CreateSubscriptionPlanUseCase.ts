import { CreateSubscriptionRequestRequestDTO } from "../../../DTOs/admin/subscription-plans/CreateSubscriptionRequestDTO";
import { SubscriptionResponseDTO } from "../../../DTOs/admin/subscription-plans/SubscriptionResponseDTO";
import { ISubscriptionPlansRepository } from "../../../../domain/repositories/admin/ISubscriptionPlansRepository";
import { ISubscriptionMapper } from "../../../interface/mapper/admin/ISubscriptionMapper";
import { ICreateSubscriptionPlanUseCase } from "../../../interface/useCases/admin/subscription-plans/ICreateSubscriptionUseCase";

export class CreateSubscriptionPlanUseCase implements ICreateSubscriptionPlanUseCase {
  constructor(
        private _subscriptionRepo : ISubscriptionPlansRepository,
        private _subscriptionMapper: ISubscriptionMapper
  ){}

 async execute(dto: CreateSubscriptionRequestRequestDTO): Promise<SubscriptionResponseDTO> {

        const  created = await this._subscriptionRepo.createSubscriptionPlans(dto);
        if(!created) throw new Error("Failure in  creating subscription plans");
   return this._subscriptionMapper.toResponseDTO(created);

 }
}