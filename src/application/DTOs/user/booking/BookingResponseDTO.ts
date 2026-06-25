import { BookingStatus } from '../../../../domain/enums/user/Booking';

export interface BookingResponseDTO {
  userId: string;
  eventId: string;
  tickets: {
    name: string;
    quantity: number;
    price: number;
  }[];

  totalAmount: number;
  status: BookingStatus;
  createdAt?: Date;
  eventTitle: string;
  eventStartDate: string;
  eventEndDate: string;
  attendanceDate:string
  organizerName: string;
  eventStartTime:string;
  eventEndTime:string;
  eventVenue: string;
  userName: string;
  eventImages?: string[];
  id?: string;
  userEmail?: string;
}
