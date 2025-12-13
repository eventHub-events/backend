import {
  SubscriptionPlansFilter,
  SubscriptionPlanPaginatedResult,
} from '../../../../domain/interface/admin-finance-query/subcription';
import { IAdminFinanceQueryRepository } from '../../../../domain/repositories/admin/IAdminFinanceQueryRepository';
import { IGetSubscriptionPlansUseCase } from '../../../interface/useCases/admin/finance-payout/IGetSubscriptionUseCase';

export class GetSubscriptionPlansUseCase implements IGetSubscriptionPlansUseCase {
  constructor(private _repo: IAdminFinanceQueryRepository) {}
  async execute(
    filter: SubscriptionPlansFilter
  ): Promise<SubscriptionPlanPaginatedResult> {
    return this._repo.getSubscriptionPlans(filter);
  }
}
