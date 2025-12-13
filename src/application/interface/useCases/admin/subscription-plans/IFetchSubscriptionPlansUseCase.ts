import { SubscriptionResponseDTO } from '../../../../DTOs/admin/subscription-plans/SubscriptionResponseDTO';

export interface IFetchSubscriptionPlansUseCase {
  execute(): Promise<SubscriptionResponseDTO[]>;
}
