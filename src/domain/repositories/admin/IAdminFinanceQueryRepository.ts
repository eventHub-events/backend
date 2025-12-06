import { FinanceOverviewFilter, FinanceOverviewResults } from "../../interface/admin-finance-query/finance";

export interface IAdminFinanceQueryRepository {
  getFinanceOverview(filter : FinanceOverviewFilter) : Promise<FinanceOverviewResults>;
}