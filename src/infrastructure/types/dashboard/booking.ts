import {
  BookingStatus,
  PayoutStatus,
} from '../../../domain/enums/user/Booking';

export type ReportRange = 'daily' | 'monthly' | 'yearly';
export interface BookingMatchFilter {
  status: BookingStatus;
  payoutStatus?: PayoutStatus;
  createdAt?: {
    $gte: Date;
    $lte: Date;
  };
}
