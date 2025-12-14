import { EventAnalyticsSummaryDTO } from "../../../application/DTOs/common/event-analytics/eventAnalyticsSummaryDTO";
import { TrendPointDTO } from "../../../application/DTOs/common/event-analytics/trendPointDTO";

export interface EventAnalyticsData {
  summary: EventAnalyticsSummaryDTO;
  ticketTrend: TrendPointDTO[];
  revenueTrend: TrendPointDTO[];
  paymentSplit: { method: string; amount: number }[];
  refundSplit: { status: string; refundedAmount: number }[];
}