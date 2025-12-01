import { EventModerationRequestDTO } from "../../../../DTOs/admin/EventModeration/EventModerationReqDTO";
import { EventModerationResponseDTO } from "../../../../DTOs/admin/EventModeration/EventModerationResponseDTO";
import { EventApprovalStatus } from "../../../../../domain/enums/organizer/events";
import { IEventModerationRepository } from "../../../../../domain/repositories/admin/IEventModerationRepository";
import { IEventRepository } from "../../../../../domain/repositories/organizer/IEventsRepository";
import { IEventModerationMapper } from "../../../../interface/mapper/admin/IEventModerationMapper";
import { IApproveEventUseCase } from "../../../../interface/useCases/admin/event-management/IApproveEventUseCase";

export class ApproveEventUseCase implements IApproveEventUseCase {
 constructor(
     private _eventModerationRepository: IEventModerationRepository,
     private _moderationMapper : IEventModerationMapper,
    //  private _eventStatus: IEventStatusCalculatorClass,
     private _eventRepository: IEventRepository

 ){}
 async execute(eventId: string, data: EventModerationRequestDTO): Promise<EventModerationResponseDTO>{
  const moderationEntity = await this._eventModerationRepository.findEventModerationByEventId(data.eventId);
         if(!moderationEntity) throw new Error("Moderation  details not found");

      const eventEntity = await this._eventRepository.findEventById(data.eventId);
    if(!eventEntity) throw new Error("Event details not found")
           moderationEntity.approveEvent(data.approvedBy!);
          
          const status =  moderationEntity.computeStatus(eventEntity);
         
          eventEntity.updateStatus(status as EventApprovalStatus)
      const [moderation] = await Promise.all([this._eventModerationRepository.updateEventModeration(data.eventId, moderationEntity), this._eventRepository.updateEvent(data.eventId, eventEntity)])
          return  this._moderationMapper.toResponseDTO(moderation)
           

      
 }
}