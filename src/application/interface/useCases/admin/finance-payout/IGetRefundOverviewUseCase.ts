import {
  RefundOverviewResult,
  RefundsFilter,
} from '../../../../../domain/interface/admin-finance-query/refund';

export interface IGetRefundOverviewUseCase {
  execute(filter?: RefundsFilter): Promise<RefundOverviewResult>;
}
