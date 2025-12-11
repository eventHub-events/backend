import { FinanceOverviewFilter, FinanceOverviewResults } from "../../../../domain/interface/admin-finance-query/finance";
import { IAdminFinanceQueryRepository } from "../../../../domain/repositories/admin/IAdminFinanceQueryRepository";
import { IGetFinanceOverviewUseCase } from "../../../interface/useCases/admin/finance-payout/IGetFinanceOverviewUseCase";

export class GetFinanceOverviewUseCase implements IGetFinanceOverviewUseCase {
  constructor(
     private readonly _financeQueryRepo : IAdminFinanceQueryRepository
  ){}
 async execute(filter: FinanceOverviewFilter): Promise<FinanceOverviewResults> {
  
     return this._financeQueryRepo.getFinanceOverview(filter);
 }
}