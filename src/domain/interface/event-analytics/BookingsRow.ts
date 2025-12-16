import {
  BookingStatus,
  PaymentMethod,
  RefundStatus,
} from '../../enums/user/Booking';

export interface BookingsRow {
  id: string;
  userName: string;
  tickets: number;
  amount: number;
  paymentMethod: PaymentMethod | undefined;
  refundStatus: RefundStatus;
  status: BookingStatus;
  createdAt: Date;
}
