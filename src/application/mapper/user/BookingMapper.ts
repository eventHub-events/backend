import { Types } from "mongoose";
import { BookingRequestDTO } from "../../../domain/DTOs/user/booking/BookingRequestDTO";
import { BookingResponseDTO } from "../../../domain/DTOs/user/booking/BookingResponseDTO";
import { BookingEntity } from "../../../domain/entities/user/BookingEntity";
import { IBookingMapper } from "../../interface/mapper/user/IBookingMapper";
import { BookingStatus } from "../../../domain/enums/user/Booking";

export class BookingMapper implements IBookingMapper {
  toEntity(dto: BookingRequestDTO): BookingEntity {
       const totalAmount = dto.tickets.reduce((sum,t) => sum+t.price * t.quantity,0);
      return new BookingEntity({
          eventId: new Types.ObjectId(dto.eventId),
          userId:  new Types.ObjectId(dto.userId),
          tickets: dto.tickets,
          eventTitle: dto.eventTitle,
          eventDate: dto.eventDate,
          organizerName: dto.organizerName,
          eventVenue: dto.eventVenue,
          status:  BookingStatus.PENDING_PAYMENT,
          expiresAt:  new Date(Date.now() + 15 * 60 * 1000),
          totalAmount: totalAmount,
          userName : dto.userName
          

      })
  }
  toResponseDTO(entity: BookingEntity): BookingResponseDTO {
      return {
         userId: entity.userId.toString(),
         eventId: entity.eventId.toString(),
         tickets: entity.tickets,
         totalAmount: entity.totalAmount,
         status: entity.status,
         eventTitle: entity.eventTitle,
         organizerName: entity.organizerName,
         eventVenue: entity.eventVenue,
         eventDate: entity.eventDate,
         id: entity.id?.toString(),
         userName: entity.userName
      }
  }
  toResponseDTOList(entity: BookingEntity[]) : BookingResponseDTO[] {
    return entity.map((e) => this.toResponseDTO(e))
  }
 
}