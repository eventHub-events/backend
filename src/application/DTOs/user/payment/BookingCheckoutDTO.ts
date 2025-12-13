export interface BookingCheckoutDTO {
  bookingId: string;
  userId: string;
  organizerId: string;
  totalAmount: number;
  eventTitle: string;
  ticketType?: string;
  organizerStripeId?: string;
  platformCommissionRate?: number;
}
