import { EventRevenueFilter, EventRevenuePaginated } from "../../../../domain/interface/admin-finance-query/eventRevenue";
import { IAdminFinanceQueryRepository } from "../../../../domain/repositories/admin/IAdminFinanceQueryRepository";
import { IGetEventRevenueSummaryUseCase } from "../../../interface/useCases/admin/finance-payout/IGetEventRevenueSummaryUseCase";

export class EventRevenueSummaryUseCase implements IGetEventRevenueSummaryUseCase {

   constructor(
      private _repo : IAdminFinanceQueryRepository
   ){}
  async execute(filter: EventRevenueFilter): Promise<EventRevenuePaginated> {
      return this._repo.getEventRevenueSummary(filter);
  }
}