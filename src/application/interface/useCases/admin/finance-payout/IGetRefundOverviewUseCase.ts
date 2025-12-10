import { RefundOverviewResult } from "../../../../../domain/interface/admin-finance-query/refund";

export interface IGetRefundOverviewUseCase {
  execute(from? : Date, to?: Date): Promise<RefundOverviewResult>;
  
}