import { BookingDetailsByIdResponseDTO } from "../../../domain/DTOs/organizer/bookings/bookingDetailsByIdResponseDTO";
import { BookingEntity } from "../../../domain/entities/user/BookingEntity";
import { IBookingDetailsByIdMapper } from "../../interface/mapper/organizer/IBookingDetailsMapper";

export  class BookingDetailsByIdMapper implements IBookingDetailsByIdMapper {
  toResponseDTO(data: BookingEntity): BookingDetailsByIdResponseDTO {
      const tickets = data.tickets.map((t)=> {
         return {
           name: t.name,
           quantity: t.quantity,
           price: t.price,
           subTotal: t.price*t.quantity
         }
      })

      return {
          bookingId : data.id?.toString(),
          bookingStatus : data.status,
          bookingDate: data.createdAt?new Date(data.createdAt).toLocaleString("en-IN", {
                                         day: "2-digit",
                                         month: "short",
                                         year: "numeric",
                                         hour: "2-digit",
                                         minute: "2-digit",
                                         hour12: true
                                         }): undefined,
        totalAmount: data.totalAmount,
        tickets: tickets,
        event : {
             eventId: data.eventId.toString(),
             title : data.eventTitle,
             date : data.eventDate,
             venue: data.eventVenue,
             },
        
        user: {
            name: data.userName
           }
      }
  }
}