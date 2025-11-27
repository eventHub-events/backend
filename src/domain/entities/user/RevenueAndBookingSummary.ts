export interface RevenueAndBookingSummary {
  totals: {
    totalRevenue: number;
    platformRevenue: number;
    organizerRevenue: number;
    bookingsCount: number;
  };
  timeline: RevenueTimelinePoint[];
}

export interface RevenueTimelinePoint {
  dateLabel: string;
  totalRevenue: number;
  platformRevenue: number;
  organizerRevenue: number;
  bookingsCount: number;
}