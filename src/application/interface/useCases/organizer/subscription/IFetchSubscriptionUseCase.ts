import { SubscriptionResponseDTO } from "../../../../DTOs/admin/subscription-plans/SubscriptionResponseDTO";

export interface IFetchSubscriptionUseCase {
   execute(subscriptionId: string): Promise<SubscriptionResponseDTO>;
}