import { CreateSubscriptionRequestRequestDTO } from "../../../../DTOs/admin/subscription-plans/CreateSubscriptionRequestDTO";
import { SubscriptionResponseDTO } from "../../../../DTOs/admin/subscription-plans/SubscriptionResponseDTO";

export interface ICreateSubscriptionPlanUseCase {
  execute(dto: CreateSubscriptionRequestRequestDTO) : Promise<SubscriptionResponseDTO>
}