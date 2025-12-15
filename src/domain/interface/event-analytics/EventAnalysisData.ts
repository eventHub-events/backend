import { EventAnalyticsSummaryDTO } from '../../../application/DTOs/common/event-analytics/eventAnalyticsSummaryDTO';
import { TicketRevenueDTO } from '../../../application/DTOs/common/event-analytics/ticketRevenueDTO';
import { TrendPointDTO } from '../../../application/DTOs/common/event-analytics/trendPointDTO';
import { BookingStatus } from '../../enums/user/Booking';
import { BookingsRow } from './BookingsRow';
import { ITicketTypePerformance } from './TicketTypePerformance';

export interface EventAnalyticsData {
  summary: EventAnalyticsSummaryDTO;
  ticketTrend: TrendPointDTO[];
  revenueTrend: TrendPointDTO[];
  paymentSplit: { method: string; amount: number }[];
  refundSplit: { status: string; refundedAmount: number }[];
  ticketRevenueSplit : TicketRevenueDTO[];
  ticketTypePerformance : ITicketTypePerformance[];
  topTicketType : ITicketTypePerformance | null;
  bookings : BookingsRow[];
  pagination : {
    total : number;
    page: number;
    limit: number;
    totalPages : number
  }
}


export const SALE_STATUSES = [
  BookingStatus.CONFIRMED,
  BookingStatus.REFUNDED
];
