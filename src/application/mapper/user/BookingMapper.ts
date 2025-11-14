import { Types } from "mongoose";
import { BookingRequestDTO } from "../../DTOs/user/booking/BookingRequestDTO";
import { BookingResponseDTO } from "../../DTOs/user/booking/BookingResponseDTO";
import { BookingEntity } from "../../../domain/entities/user/BookingEntity";
import { IBookingMapper } from "../../interface/mapper/user/IBookingMapper";
import { BookingStatus } from "../../../domain/enums/user/Booking";
import { UserBookingListResponseDTO } from "../../DTOs/user/booking/UserBookingListResponseDTO";

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
          userName : dto.userName,
          organizerId: new Types.ObjectId(dto.organizerId),
          eventImages: dto.eventImages
          

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
         userName: entity.userName,
         eventImages: entity.eventImages
      }
  }
  toResponseDTOList(entity: BookingEntity[]) : BookingResponseDTO[] {
    return entity.map((e) => this.toResponseDTO(e))
  }
  toUserResponseDTO(entity: BookingEntity): UserBookingListResponseDTO {
       return {
          bookingId : entity.id?.toString(),
          eventId : entity.eventId.toString(),
          eventName : entity.eventTitle,
          eventDate : entity.eventDate,
          eventLocation : entity.eventVenue,
          organizerName : entity.organizerName,
          tickets : entity.tickets,
          totalAmount : entity.totalAmount,
          paymentStatus : entity.status,
          bookingDate : entity.createdAt,
          eventImages :entity.eventImages,
          userName: entity.userName

       }
  }
  toUserResponseDTOList(entity: BookingEntity[]): UserBookingListResponseDTO[] {

    return entity.map((booking) => this.toUserResponseDTO(booking));
      
  }
 
}