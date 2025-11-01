import { BookingDetailsByIdResponseDTO } from "../../../../domain/DTOs/organizer/bookings/bookingDetailsByIdResponseDTO";
import { BookingEntity } from "../../../../domain/entities/user/BookingEntity";

export interface IBookingDetailsByIdMapper {
   toResponseDTO(data: BookingEntity) : BookingDetailsByIdResponseDTO;
}