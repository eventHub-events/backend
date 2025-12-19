import {
  PayoutsFilter,
  PayoutPaginatedResult,
} from '../../../../domain/interface/admin-finance-query/payout';
import { IAdminFinanceQueryRepository } from '../../../../domain/repositories/admin/IAdminFinanceQueryRepository';
import { IGetPayoutUseCase } from '../../../interface/useCases/admin/finance-payout/IGetPayoutUseCase';

export class GetPayoutsUseCase implements IGetPayoutUseCase {
  constructor(private _repo: IAdminFinanceQueryRepository) {}
  async execute(filter: PayoutsFilter): Promise<PayoutPaginatedResult> {
    return this._repo.getPayouts(filter);
  }
}
