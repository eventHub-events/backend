import {
  SubscriptionOverviewFilter,
  SubscriptionOverviewResult,
} from '../../../../../domain/interface/admin-finance-query/subcription';

export interface IGetSubscriptionOverviewUseCase {
  execute(
    filter?: SubscriptionOverviewFilter
  ): Promise<SubscriptionOverviewResult>;
}
