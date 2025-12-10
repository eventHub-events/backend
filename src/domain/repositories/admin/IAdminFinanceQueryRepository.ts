import { FinanceOverviewFilter, FinanceOverviewResults } from "../../interface/admin-finance-query/finance";
import { RefundOverviewResult, RefundPaginatedResult, RefundsFilter } from "../../interface/admin-finance-query/refund";
import { TransactionPaginatedResult, TransactionsFilter } from "../../interface/admin-finance-query/transactions";

export interface IAdminFinanceQueryRepository {
  getFinanceOverview(filter : FinanceOverviewFilter) : Promise<FinanceOverviewResults>;
  getTransactions(filter: TransactionsFilter): Promise<TransactionPaginatedResult>;
  getRefunds(filter: RefundsFilter) : Promise<RefundPaginatedResult>;
  getRefundOverview(filter?: RefundsFilter) : Promise<RefundOverviewResult>
}