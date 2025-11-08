import { SubscriptionPlansEntity } from "../../entities/admin/SubscriptionPlansEntity";


export interface ISubscriptionPlansRepository {
  createSubscriptionPlans(entity: SubscriptionPlansEntity): Promise<SubscriptionPlansEntity>;
  fetchSubscriptionPlanById(subscriptionId: string): Promise<SubscriptionPlansEntity>;
  updateSubscriptionPlans(subscriptionId: string, entity: SubscriptionPlansEntity): Promise<SubscriptionPlansEntity>;
  fetchSubscriptionPlans() :  Promise<SubscriptionPlansEntity[]>;
}