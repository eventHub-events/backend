import { SubscriptionResponseDTO } from '../../../../DTOs/admin/subscription-plans/SubscriptionResponseDTO';

export interface IFetchSubscriptionPlansForOrganizerUseCase {
  execute(): Promise<SubscriptionResponseDTO[]>;
}
