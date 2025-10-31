import { BookingStatus } from "../../../enums/user/Booking";

export interface BookingFilterForAdminDTO {
    userName?: String;
    status?: BookingStatus;
    organizerName?: string;
    startDate?: string;
    endDate?:string;
    eventTitle?: string;
    page?: number;
    limit?: number;

}