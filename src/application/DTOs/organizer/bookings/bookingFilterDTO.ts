import { BookingStatus } from "../../../../domain/enums/user/Booking";

export interface BookingFilterDTO {
   organizerId?: string;
   title?: string;
  userName?: string;
  userId?: string;
  startDate?: string;
  endDate?: string;
  status?: BookingStatus;
  page?: number;
  limit?: number;
  organizerName?: string;

}