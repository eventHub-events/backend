import { BookingResponseDTOForAdmin } from "../../../domain/DTOs/admin/bookings/BookingResponseDTOForAdmin";
import { BookingEntity } from "../../../domain/entities/user/BookingEntity";
import { IBookingMapperAdmin } from "../../interface/mapper/admin/IBookingMapperAdmin";

export class BookingMapperAdmin implements IBookingMapperAdmin {
  toResponseDTO(data: BookingEntity): BookingResponseDTOForAdmin {
      

    return {
         id: data.id?.toString(),
         eventTitle: data.eventTitle,
         organizerName : data.organizerName,
         userName : data.userName,
         totalTickets: data.tickets.reduce((sum, t) => sum+t.quantity,0),
         status : data.status,
         bookingDate: data.createdAt,
         eventDate : data.eventDate,
         eventVenue : data.eventVenue



    }
  }
  toResponseDTOList(data: BookingEntity[]): BookingResponseDTOForAdmin[] {
      return data.map((t) => this.toResponseDTO(t));
  }
}