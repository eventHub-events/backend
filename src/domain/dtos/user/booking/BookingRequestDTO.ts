import { BookingStatus } from "../../../enums/user/Booking";

export interface BookingRequestDTO {
  userId: string;
  eventId: string;
  tickets : {
               name:  string, quantity: number, price: number
                                        }[],
 totalAmount? : number,
  status?: BookingStatus,
  eventTitle: string,
  eventDate: string,
  organizerName: string,
  userName: string;
  eventVenue: string,
   createdAt? : Date ,
   organizerId: string
}