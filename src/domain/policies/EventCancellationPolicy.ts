import { ICancellationPolicy } from '../interface/policies/ICancellationPolicy';

export class EventCancellationPolicy implements ICancellationPolicy {
  canUserCancelBooking(bookingEventDate: Date, currentDate: Date): boolean {
    const oneDay = 24 * 60 * 60 * 1000;
    return bookingEventDate.getTime() - currentDate.getTime() > oneDay;
  }
}
