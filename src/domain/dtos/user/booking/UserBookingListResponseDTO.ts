
import { BookingStatus } from "../../../enums/user/Booking";

export interface UserBookingListResponseDTO {
   bookingId?: string;
   eventId: string;
   eventName :string;
   eventImages?: string[];
   eventDate: string;
   eventLocation: string;
   organizerName: string;
   tickets : {
                 name:  string, quantity: number, price: number
                                          }[];
   totalAmount: number;
   paymentStatus: BookingStatus;
   paymentMethod?: string;
   bookingDate?: Date
}