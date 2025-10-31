import { BookingStatus } from "../../../enums/user/Booking";

export interface BookingFilterForAdminDTO {
    userName?: string;
    status?: BookingStatus;
    organizerName?: string;
    startDate?: string;
    endDate?:string;
    title?: string;
    page?: number;
    limit?: number;

}