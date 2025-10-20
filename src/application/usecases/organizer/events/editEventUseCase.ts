import { EventResponseDTO } from "../../../../domain/DTOs/organizer/events/EventResponseDTO";
import { EventUpdateDTO } from "../../../../domain/DTOs/organizer/events/EventUpdateDTO";
import { EventEntity } from "../../../../domain/entities/organizer/EventEntity";
import { IEventRepository } from "../../../../domain/repositories/organizer/IEventsRepository";
import {  IUpdateEventUseCase } from "../../../interface/useCases/organizer/events/IEditEventUseCase";
import { IEventMapper } from "../../../interface/useCases/organizer/events/IEventMapper";

export class UpdateEventUseCase implements IUpdateEventUseCase {
  constructor(
       private _EventRepository: IEventRepository,
       private _eventMapper: IEventMapper
   ){}

   async execute(eventId: string, data: EventUpdateDTO): Promise< EventResponseDTO> {

       const  existingEvent = await this._EventRepository.findEventById(eventId);
       const eventEntity = this._eventMapper.toEntityForUpdate(data);

       const updatedEvent = {...existingEvent,...eventEntity};

       const savedEvent = await this._EventRepository.updateEvent(eventId, updatedEvent);
       if(!savedEvent) throw new Error("Event Update  failed")

       return this._eventMapper.toResponseDTO(savedEvent);

   }
}