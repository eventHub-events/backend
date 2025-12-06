

export interface FinanceOverviewFilter {
   from?: Date;
   to?:Date;
}

export interface FinanceOverviewTotals {
  grossTicketSales : number;
  totalRefunds : number;
  platformRevenueFromTickets : number;
  organizerRevenueFromTickets : number;

  totalBookings : number;
  confirmedBookings : number;
  cancelledBookings : number;
  failedPayments: number;
  refundedBookings :number;
}
export interface FinanceOverviewPayouts {
  pendingPayoutAmount: number;     
  paidPayoutAmount: number;        
}

export interface FinanceOverviewSubscription {
  subscriptionRevenue : number;
  totalSubscription : number;
}

export interface FinanceOverviewResults {
   timeRange : {
    from: Date;
    to: Date;
   };
   totals :FinanceOverviewTotals;
   subscription : FinanceOverviewSubscription;
   payouts :FinanceOverviewPayouts
}