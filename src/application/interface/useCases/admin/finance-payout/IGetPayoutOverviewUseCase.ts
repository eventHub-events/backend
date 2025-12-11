import { FinanceOverviewFilter } from "../../../../../domain/interface/admin-finance-query/finance";
import { PayoutOverviewResult, PayoutsFilter } from "../../../../../domain/interface/admin-finance-query/payout";

export interface IGetPayoutOverviewUseCase {
  execute(filter?: FinanceOverviewFilter): Promise<PayoutOverviewResult>;
}