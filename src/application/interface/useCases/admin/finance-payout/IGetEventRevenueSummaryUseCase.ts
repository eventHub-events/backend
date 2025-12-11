import { EventRevenueFilter, EventRevenuePaginated } from "../../../../../domain/interface/admin-finance-query/eventRevenue";

export interface IEventRevenueSummaryUseCase {
  execute(filter:EventRevenueFilter): Promise<EventRevenuePaginated>;
}