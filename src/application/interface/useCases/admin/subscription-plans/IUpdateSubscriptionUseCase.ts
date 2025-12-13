import { SubscriptionResponseDTO } from '../../../../DTOs/admin/subscription-plans/SubscriptionResponseDTO';
import { UpdateSubscriptionRequestDTO } from '../../../../DTOs/admin/subscription-plans/UpdateSubscriptionRequestDTO';

export interface IUpdateSubscriptionPlansUseCase {
  execute(
    subscriptionPlanId: string,
    dto: UpdateSubscriptionRequestDTO
  ): Promise<SubscriptionResponseDTO>;
}
