import { RefundsFilter, RefundPaginatedResult } from "../../../../domain/interface/admin-finance-query/refund";
import { IAdminFinanceQueryRepository } from "../../../../domain/repositories/admin/IAdminFinanceQueryRepository";
import { IGetRefundsUseCase } from "../../../interface/useCases/admin/finance-payout/IGetRefundsUseCase";

export class GetRefundsUseCase implements IGetRefundsUseCase {
   constructor(
      private _repo : IAdminFinanceQueryRepository
   ){}
async execute(filter: RefundsFilter): Promise<RefundPaginatedResult> {
    return this._repo.getRefunds(filter);
}
}