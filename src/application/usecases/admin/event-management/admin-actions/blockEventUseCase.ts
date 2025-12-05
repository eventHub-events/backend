import { EventModerationRequestDTO } from "../../../../DTOs/admin/EventModeration/EventModerationReqDTO";
import { EventModerationResponseDTO } from "../../../../DTOs/admin/EventModeration/EventModerationResponseDTO";
import { IEventModerationRepository } from "../../../../../domain/repositories/admin/IEventModerationRepository";
import { IEventRepository } from "../../../../../domain/repositories/organizer/IEventsRepository";
import { IEventModerationMapper } from "../../../../interface/mapper/admin/IEventModerationMapper";
import { IBlockEventUseCase } from "../../../../interface/useCases/admin/event-management/IBlockEventUseCase";
import { ErrorMessages } from "../../../../../constants/errorMessages";

export class BlockEventUseCase implements IBlockEventUseCase {
 constructor(
     private _eventModerationRepository: IEventModerationRepository,
     private _moderationMapper : IEventModerationMapper,
    //  private _eventStatus: IEventStatusCalculatorClass,
     private _eventRepository: IEventRepository

 ){}
 async execute(eventId: string, data: EventModerationRequestDTO): Promise<EventModerationResponseDTO>{
  const moderationEntity = await this._eventModerationRepository.findEventModerationByEventId(data.eventId);
         if(!moderationEntity) throw new Error(ErrorMessages.EVENT_MODERATION.EVENT_MODERATION_DETAILS_REQUIRED);

      const eventEntity = await this._eventRepository.findEventById(data.eventId);
    if(!eventEntity) throw new Error(ErrorMessages.EVENT.NOT_FOUND);
           moderationEntity.blockEvent(data.rejectionReason,data.blockedBy);
          
          const status =  moderationEntity.computeStatus();
           eventEntity.updateStatus(status)
          
          
         ;
      const [moderation] = await Promise.all([this._eventModerationRepository.updateEventModeration(data.eventId, moderationEntity), this._eventRepository.updateEvent(data.eventId, eventEntity)])
          return  this._moderationMapper.toResponseDTO(moderation);
           

      
 }
}