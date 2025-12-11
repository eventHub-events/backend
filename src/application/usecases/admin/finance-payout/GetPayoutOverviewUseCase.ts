import { FinanceOverviewFilter } from "../../../../domain/interface/admin-finance-query/finance";
import { PayoutsFilter, PayoutOverviewResult } from "../../../../domain/interface/admin-finance-query/payout";
import { IAdminFinanceQueryRepository } from "../../../../domain/repositories/admin/IAdminFinanceQueryRepository";
import { IGetPayoutOverviewUseCase } from "../../../interface/useCases/admin/finance-payout/IGetPayoutOverviewUseCase";

export class GetPayoutOverviewUseCase implements IGetPayoutOverviewUseCase {
   constructor(
      private _repo : IAdminFinanceQueryRepository
   ){}
   async execute(filter?: FinanceOverviewFilter): Promise<PayoutOverviewResult> {
        return this._repo.getPayoutOverview(filter);
   }
}