import { BookingStatus } from '../../../../domain/enums/user/Booking';

export interface BookingDetailsByIdResponseDTO {
  bookingId?: string;
  bookingStatus: BookingStatus;
  bookingDate?: string;
  totalAmount: number;
  paymentMethod?: string;
  paymentId?: string;

  tickets: {
    name: string;
    quantity: number;
    price: number;
    subTotal: number;
  }[];

  event: {
    eventId: string;
    title: string;
    date: string;
    time?: string;
    venue: string;
  };

  user: {
    name: string;
    email?: string;
    phone?: string;
  };
}
