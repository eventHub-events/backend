import {
  SubscriptionOverviewFilter,
  SubscriptionOverviewResult,
} from '../../../../domain/interface/admin-finance-query/subcription';
import { IAdminFinanceQueryRepository } from '../../../../domain/repositories/admin/IAdminFinanceQueryRepository';
import { IGetSubscriptionOverviewUseCase } from '../../../interface/useCases/admin/finance-payout/IGetSubscriptionOverviewUseCase';

export class GetSubscriptionOverviewUseCase implements IGetSubscriptionOverviewUseCase {
  constructor(private _repo: IAdminFinanceQueryRepository) {}
  async execute(
    filter?: SubscriptionOverviewFilter
  ): Promise<SubscriptionOverviewResult> {
    return this._repo.getSubscriptionOverview(filter);
  }
}
