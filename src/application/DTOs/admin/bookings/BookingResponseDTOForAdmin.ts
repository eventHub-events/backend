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
  eventStartTime:string;
  eventEndTime:string;
  eventStartDate:string;
  eventEndDate :string;
  attendanceDate:string;
 
}
