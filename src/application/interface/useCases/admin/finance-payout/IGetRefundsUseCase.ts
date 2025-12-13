import {
  RefundPaginatedResult,
  RefundsFilter,
} from '../../../../../domain/interface/admin-finance-query/refund';

export interface IGetRefundsUseCase {
  execute(filter: RefundsFilter): Promise<RefundPaginatedResult>;
}
