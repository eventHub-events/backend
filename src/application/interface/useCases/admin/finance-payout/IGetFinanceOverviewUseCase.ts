import { FinanceOverviewFilter, FinanceOverviewResults } from "../../../../../domain/interface/admin-finance-query/finance";

export interface IGetFinanceOverviewUseCase {
  execute(filter: FinanceOverviewFilter) : Promise<FinanceOverviewResults>;
}