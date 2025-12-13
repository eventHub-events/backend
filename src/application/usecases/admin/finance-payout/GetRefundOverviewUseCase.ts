import {
  RefundOverviewResult,
  RefundsFilter,
} from '../../../../domain/interface/admin-finance-query/refund';
import { IAdminFinanceQueryRepository } from '../../../../domain/repositories/admin/IAdminFinanceQueryRepository';
import { IGetRefundOverviewUseCase } from '../../../interface/useCases/admin/finance-payout/IGetRefundOverviewUseCase';

export class GetRefundOverviewUseCase implements IGetRefundOverviewUseCase {
  constructor(private _repo: IAdminFinanceQueryRepository) {}

  async execute(filter?: RefundsFilter): Promise<RefundOverviewResult> {
    return this._repo.getRefundOverview(filter);
  }
}
