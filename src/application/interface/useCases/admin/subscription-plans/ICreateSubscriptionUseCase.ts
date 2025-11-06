import { CreateSubscriptionRequestRequestDTO } from "../../../../../domain/DTOs/admin/subscription-plans/CreateSubscriptionRequestDTO";
import { SubscriptionResponseDTO } from "../../../../../domain/DTOs/admin/subscription-plans/SubscriptionResponseDTO";

export interface ICreateSubscriptionPlanUseCase {
  execute(dto: CreateSubscriptionRequestRequestDTO) : Promise<SubscriptionResponseDTO>
}