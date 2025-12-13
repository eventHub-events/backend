import { ErrorMessages } from '../../../../constants/errorMessages';
import { NotFoundError } from '../../../../domain/errors/common';
import {
  TransactionsFilter,
  TransactionPaginatedResult,
} from '../../../../domain/interface/admin-finance-query/transactions';
import { IAdminFinanceQueryRepository } from '../../../../domain/repositories/admin/IAdminFinanceQueryRepository';
import { IGetTransactionsUseCase } from '../../../interface/useCases/admin/finance-payout/IGetTransactionsUseCase';

export class GetTransactionsUseCase implements IGetTransactionsUseCase {
  constructor(private _financeQueryRepo: IAdminFinanceQueryRepository) {}

  async execute(
    filter: TransactionsFilter
  ): Promise<TransactionPaginatedResult> {
    const result = await this._financeQueryRepo.getTransactions(filter);
    if (!result) throw new NotFoundError(ErrorMessages.Transactions.NOT_FOUND);

    return result;
  }
}
