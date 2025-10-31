import { BookingStatus } from "../../../enums/user/Booking";

export interface BookingFilterDTO {
   organizerId: string;
   title?: string;
  userName?: string;
  startDate?: string;
  endDate?: string;
  status?: BookingStatus;
  page?: number;
  limit?: number;
  organizerName?: string;

}