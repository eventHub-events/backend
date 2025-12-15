export interface EventAnalyticsFilter {
  page?: number;
  limit?: number;
  eventId: string;
  from?: Date | string;
  to?: Date | string;
  bookingStatus?: string;
  paymentMethod?: string;
  refundStatus?: string;
  search?: string;
}
