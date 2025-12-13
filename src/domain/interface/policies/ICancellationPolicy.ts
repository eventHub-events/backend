export interface ICancellationPolicy {
  canUserCancelBooking(bookingEventDate: Date, currentDate: Date): boolean;
}
