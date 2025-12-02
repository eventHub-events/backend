import { Types } from "mongoose";
import { EventTicketingRequestDTO } from "../../DTOs/organizer/ticketing/EventTicketingRequestDTO";
import { EventTicketingResponseDTO } from "../../DTOs/organizer/ticketing/EventTicketingResponseDTO";
import { EventTicketingEntity } from "../../../domain/entities/organizer/EventTicketingEntity";
import { ITicketingMapper } from "../../interface/mapper/organizer/ITicketingMapper";
import { EventTicketingEditDTO } from "../../DTOs/organizer/ticketing/EventTicketingEditDTO";

export  class TicketingMapper implements ITicketingMapper {
  toEntity(dto: EventTicketingRequestDTO): EventTicketingEntity {
      return new EventTicketingEntity ({
          eventId : new Types.ObjectId(dto.eventId),
          organizerId: new Types.ObjectId(dto.organizerId),
          saleStartDate: dto.saleStartDate,
          saleEndDate: dto.saleEndDate,
          waitingListEnabled: dto.waitingListEnabled,
          waitingList: dto.waitingList,
          platformCommission: dto.platformCommission,
          tickets: dto.tickets
      })
  }
  toResponseDTO(entity: EventTicketingEntity): EventTicketingResponseDTO {
      return {
         eventId: entity.eventId.toString(),
         organizerId: entity.organizerId.toString(),
         tickets: entity.tickets,
         saleStartDate: entity.saleStartDate,
         saleEndDate: entity.saleEndDate,
         status: entity.status,
         platformCommission: entity.platformCommission,
         ticketsSold: entity.ticketsSold,
         totalRevenue: entity.totalRevenue,
         organizerEarnings: entity.organizerEarnings,
         ticketRevenue: entity.ticketRevenue,
         waitingList : entity.waitingList,
         waitingListEnabled  : entity.waitingListEnabled,
         id: entity.id?.toString()

         
      }
  }
  toEntityForUpdate(dto: EventTicketingEditDTO): Partial<EventTicketingEntity> {
      return {
          tickets: dto.tickets,
          saleStartDate : dto.saleStartDate,
          saleEndDate : dto.saleEndDate,
          waitingListEnabled : dto.waitingListEnabled,
          waitingList : dto.waitingList,
          platformCommission: dto.platformCommission
      }
  }
}