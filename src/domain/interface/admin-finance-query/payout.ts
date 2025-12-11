export interface PayoutsFilter {
  page?: number;
  limit?: number;
  from?: string | Date;
  to?: string | Date;
  status?: string; // pending | paid
  organizerName?: string;
  eventTitle?: string;
  paymentMethod?: string;
}

export interface PayoutRow {
  bookingId: string;
  eventId: string;
  eventTitle: string;
  organizerName: string;
  organizerAmount: number;
  payoutStatus: string;
  payoutDueDate?: string;
  payoutDate?: string;
  paymentMethod?: string;
  paymentId?: string;
  createdAt: string;
}

export interface PayoutPaginatedResult {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: PayoutRow[];
}

export interface PayoutOverviewTotals {
  totalPendingPayout: number;
  totalPaidPayout: number;
  pendingCount: number;
  paidCount: number;
}

export interface PayoutOverviewTrends {
  daily: { date: string; amount: number }[];
  monthly: { month: string; amount: number }[];
  yearly: { year: string; amount: number }[];
}

export interface PayoutOverviewResult {
  timeRange: { from: Date; to: Date };
  totals: PayoutOverviewTotals;
  trend: PayoutOverviewTrends;
}
