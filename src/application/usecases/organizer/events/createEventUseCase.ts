import { EventCreationRequestDTO } from "../../../../domain/DTOs/organizer/events/EventCreationRequestDTO";
import { EventResponseDTO } from "../../../../domain/DTOs/organizer/events/EventResponseDTO";
import { IEventRepository } from "../../../../domain/repositories/organizer/IEventsRepository";
import { ICreateEventUseCase } from "../../../interface/useCases/organizer/events/ICreateEventUseCase";
import { IEventMapper } from "../../../interface/useCases/organizer/events/IEventMapper";


export class CreateEventUseCase implements ICreateEventUseCase {
   constructor(
        private _eventRepository: IEventRepository,
        private _eventMapper: IEventMapper
   ){}
 async  execute(data: EventCreationRequestDTO): Promise<EventResponseDTO> {

       const eventEntity = this._eventMapper.toEntity(data);
       const createdEvents = this._eventRepository.findEventsByOrganizerId(data.organizerId,{createdAt: new Date})

      const eventData =  await this._eventRepository.createEvent(eventEntity);

    return this._eventMapper.toResponseDTO(eventData);
   }
}