import {
  SubscriptionPlanPaginatedResult,
  SubscriptionPlansFilter,
} from '../../../../../domain/interface/admin-finance-query/subcription';

export interface IGetSubscriptionPlansUseCase {
  execute(
    filter: SubscriptionPlansFilter
  ): Promise<SubscriptionPlanPaginatedResult>;
}
