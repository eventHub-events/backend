export interface EventRevenueRow {
  eventId: string;
  eventTitle: string;
  organizerName: string;

  ticketsSold: number;              
  grossRevenue: number;             
  platformRevenue: number;          
  organizerRevenue: number;         
  refundedAmount: number;           
  netRevenue: number;               
}

export interface EventRevenuePaginated {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: EventRevenueRow[];
}

export interface EventRevenueFilter {
  page?: number;
  limit?: number;
  organizerName?: string;
  eventTitle?: string;
  from?: string | Date;
  to?: string | Date;
}
