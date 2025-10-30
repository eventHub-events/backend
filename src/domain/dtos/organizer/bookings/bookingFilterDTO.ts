import { BookingStatus } from "../../../enums/user/Booking";

export interface BookingFilterDTO {
   title?: string;
  userName?: string;
  startDate?: string;
  endDate?: string;
  status?: BookingStatus;
  page?: number;
  limit?: number

}