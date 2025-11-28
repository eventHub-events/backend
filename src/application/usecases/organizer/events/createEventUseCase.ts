import { EventCreationRequestDTO } from "../../../DTOs/organizer/events/EventCreationRequestDTO";
import { EventResponseDTO } from "../../../DTOs/organizer/events/EventResponseDTO";
import { EventApprovalStatus } from "../../../../domain/enums/organizer/events";
import { IEventModerationRepository } from "../../../../domain/repositories/admin/IEventModerationRepository";
import { IEventRepository } from "../../../../domain/repositories/organizer/IEventsRepository";
import { ICreateEventUseCase } from "../../../interface/useCases/organizer/events/ICreateEventUseCase";
import { IEventMapper } from "../../../interface/useCases/organizer/events/IEventMapper";


export class CreateEventUseCase implements ICreateEventUseCase {
   constructor(
        private _eventRepository: IEventRepository,
        private _eventMapper: IEventMapper,
        private _eventModerationRepository: IEventModerationRepository,
        
   ){}
 async  execute(data: EventCreationRequestDTO): Promise<EventResponseDTO> {

       const eventEntity = this._eventMapper.toEntity(data);
       
        

      const eventData =  await this._eventRepository.createEvent(eventEntity);
       if(!eventData) throw new Error("Event creation failed");
       const payload= this._eventMapper.toBlankModerationEntity(eventData.eventId!, EventApprovalStatus.Pending)
      const result = await this._eventModerationRepository.createEventModeration(payload)
        

    return this._eventMapper.toResponseDTO(eventData);
   }
}