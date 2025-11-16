import { Types } from "mongoose";
import { OrganizerSubscriptionEntity } from "../../../domain/entities/organizer/OrganizerSubscriptionEntity";
import { OrganizerSubscriptionRequestDTO } from "../../DTOs/organizer/subscription/OrganizerSubscriptionRequestDTO";
import { OrganizerSubscriptionResponseDTO } from "../../DTOs/organizer/subscription/OrganizerSubscriptionResponseDTO";
import { IOrganizerSubscriptionMapper } from "../../interface/mapper/organizer/IOrganizerMapper";

export class OrganizerSubscriptionMapper implements IOrganizerSubscriptionMapper {
  toEntity(dto: OrganizerSubscriptionRequestDTO): OrganizerSubscriptionEntity {
       
       

      return new OrganizerSubscriptionEntity({
          organizerId : new Types.ObjectId(dto.organizerId),
          organizerEmail : dto.organizerEmail,
          organizerName : dto.organizerName,
          planId: new Types.ObjectId(dto.planId),
          planName :dto.planName,
          startDate : dto.startDate,
          endDate: dto.endDate,
          status: dto.status,
          paymentId: dto.paymentId,
          payoutDelayDays:  dto.durationInDays,
          price: dto.price

      })
  }
  toResponseDTO(entity: OrganizerSubscriptionEntity): OrganizerSubscriptionResponseDTO {
      return {
          organizerEmail: entity.organizerEmail,
          organizerId: entity.organizerId.toString(),
          organizerName: entity.organizerName,
          planName: entity.planName,
          planId: entity.planId.toString(),
          startDate: entity.startDate,
          endDate: entity.endDate,
          status: entity.status,
          price: entity.price,
          id: entity.id?.toString()


      }
  }
}