import {
  PayoutPaginatedResult,
  PayoutsFilter,
} from '../../../../../domain/interface/admin-finance-query/payout';

export interface IGetPayoutUseCase {
  execute(filter: PayoutsFilter): Promise<PayoutPaginatedResult>;
}
