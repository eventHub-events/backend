import { BookingResponseDTOForAdmin } from "../../../DTOs/admin/bookings/BookingResponseDTOForAdmin";

import { BookingEntity } from "../../../../domain/entities/user/BookingEntity";


export interface IBookingMapperAdmin {
   toResponseDTO(data: BookingEntity) : BookingResponseDTOForAdmin;
   toResponseDTOList(data: BookingEntity[]) : BookingResponseDTOForAdmin[];
}