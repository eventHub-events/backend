import { BookingStatus } from '../../../../domain/enums/user/Booking';

export interface BookingResponseDTOForAdmin {
  id?: string;
  eventTitle: string;
  organizerName: string;
  userName: string;
  totalTickets: number;
  bookingDate?: Date;
  status: BookingStatus;
  eventVenue: string;
  totalAmount: number;
  eventDate: string;
}
