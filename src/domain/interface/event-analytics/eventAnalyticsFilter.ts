export interface EventAnalyticsFilter {
  eventId : string;
  from? : Date | string;
  to?: Date | string;
  bookingStatus? :string;
  paymentMethod?: string;
  refundStatus?: string;
  search? : string;
  
}