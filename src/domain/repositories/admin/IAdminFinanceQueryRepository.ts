import { FinanceOverviewFilter, FinanceOverviewResults } from "../../interface/admin-finance-query/finance";
import { TransactionPaginatedResult, TransactionsFilter } from "../../interface/admin-finance-query/transactions";

export interface IAdminFinanceQueryRepository {
  getFinanceOverview(filter : FinanceOverviewFilter) : Promise<FinanceOverviewResults>;
  getTransactions(filter: TransactionsFilter): Promise<TransactionPaginatedResult>
}