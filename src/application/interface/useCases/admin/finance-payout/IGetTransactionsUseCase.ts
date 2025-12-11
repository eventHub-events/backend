import { TransactionPaginatedResult, TransactionsFilter } from "../../../../../domain/interface/admin-finance-query/transactions";

export interface IGetTransactionsUseCase {
  execute(filter: TransactionsFilter): Promise<TransactionPaginatedResult>;
}