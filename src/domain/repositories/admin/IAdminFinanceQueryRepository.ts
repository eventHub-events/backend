import { EventRevenueFilter, EventRevenuePaginated } from "../../interface/admin-finance-query/eventRevenue";
import { FinanceOverviewFilter, FinanceOverviewResults } from "../../interface/admin-finance-query/finance";
import { PayoutOverviewResult, PayoutPaginatedResult, PayoutsFilter } from "../../interface/admin-finance-query/payout";
import { RefundOverviewResult, RefundPaginatedResult, RefundsFilter } from "../../interface/admin-finance-query/refund";
import { SubscriptionOverviewFilter, SubscriptionOverviewResult } from "../../interface/admin-finance-query/subcription";
import { TransactionPaginatedResult, TransactionsFilter } from "../../interface/admin-finance-query/transactions";

export interface IAdminFinanceQueryRepository {
  getFinanceOverview(filter : FinanceOverviewFilter) : Promise<FinanceOverviewResults>;
  getTransactions(filter: TransactionsFilter): Promise<TransactionPaginatedResult>;
  getRefunds(filter: RefundsFilter) : Promise<RefundPaginatedResult>;
  getRefundOverview(filter?: RefundsFilter) : Promise<RefundOverviewResult>;
  getPayouts(filter: PayoutsFilter): Promise<PayoutPaginatedResult>;
  getPayoutOverview(filter?: FinanceOverviewFilter): Promise<PayoutOverviewResult>;
  getEventRevenueSummary(filter: EventRevenueFilter) : Promise<EventRevenuePaginated>;
  getSubscriptionOverview(filter?: SubscriptionOverviewFilter): Promise<SubscriptionOverviewResult>;
}