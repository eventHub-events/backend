import { EventRevenueFilter, EventRevenuePaginated } from "../../../../../domain/interface/admin-finance-query/eventRevenue";

export interface IGetEventRevenueSummaryUseCase {
  execute(filter:EventRevenueFilter): Promise<EventRevenuePaginated>;
}