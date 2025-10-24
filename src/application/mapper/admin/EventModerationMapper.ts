import { Types } from "mongoose";
import { EventModerationRequestDTO } from "../../../domain/DTOs/admin/EventModeration/EventModerationReqDTO";
import { EventModerationResponseDTO } from "../../../domain/DTOs/admin/EventModeration/EventModerationResponseDTO";
import { EventModerationUpdateDTO } from "../../../domain/DTOs/admin/EventModeration/EventModerationUpdateDTO";
import { EventModerationEntity } from "../../../domain/entities/admin/EventModerationEntity";
import { IEventModerationMapper } from "../../interface/mapper/admin/IEventModerationMapper";

export class EventModerationMapper implements IEventModerationMapper  {
  toEntity(dto: EventModerationRequestDTO): EventModerationEntity {
       return new EventModerationEntity({
           eventId: new Types.ObjectId(dto.eventId),
           eventApprovalStatus : dto.eventApprovalStatus,
           approved: dto.approved,
           approvedAt: dto.approvedAt,
           approvedBy : dto.approvedBy,
           rejectionReason: dto.rejectionReason,
           flaggedBy: dto.flaggedBy,
           flaggedAt: dto.flaggedAt,
           flaggedReason: dto.flaggedReason,
           isBlocked : dto.isBlocked,
           blockedAt : dto.blockedAt,
           blockedBy : dto.blockedBy,
         

       })
  }

  toEntityForUpdate(dto: EventModerationUpdateDTO): Partial<EventModerationEntity> {
      return new EventModerationEntity({
           eventId: new Types.ObjectId(dto.eventId),
           eventApprovalStatus : dto.eventApprovalStatus,
           approved: dto.approved,
           approvedAt: dto.approvedAt,
           approvedBy : dto.approvedBy,
           rejectionReason: dto.rejectionReason,
           flaggedBy: dto.flaggedBy,
           flaggedAt: dto.flaggedAt,
           flaggedReason: dto.flaggedReason,
           isBlocked : dto.isBlocked,
           blockedAt : dto.blockedAt,
           blockedBy : dto.blockedBy,
      })
  }
  toResponseDTO(entity: EventModerationEntity): EventModerationResponseDTO {
      return {
          eventId: entity.eventId.toString(),
          eventApprovalStatus:entity.eventApprovalStatus,
          approved : entity.approved,
          approvedAt: entity.approvedAt,
          approvedBy: entity.approvedBy?.toString(),
          rejectionReason :entity.rejectionReason,
          flaggedBy : entity.flaggedBy?.toString(),
          flaggedReason: entity.flaggedReason,
          flaggedAt : entity.flaggedAt,
          isBlocked: entity.isBlocked,
          blockedAt: entity.blockedAt,
          blockedBy : entity.blockedBy?.toString(),
          moderationHistory: entity.moderationHistory?.map((x) => ({
                                 action: x.action,
                                 reason: x.reason,
                                performedBy: x.performedBy?.toString()?? "",
                                performedAt: x.performedAt?? new Date,
                              })),

      }
  }
}