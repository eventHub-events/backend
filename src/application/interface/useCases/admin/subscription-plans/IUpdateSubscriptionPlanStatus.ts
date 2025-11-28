import { SubscriptionPlanStatus } from "../../../../../domain/enums/admin/subscriptionPlans";

export interface IUpdateSubscriptionPlanStatusUseCase {
  execute(planId: string, status:SubscriptionPlanStatus): Promise<string> ;
}