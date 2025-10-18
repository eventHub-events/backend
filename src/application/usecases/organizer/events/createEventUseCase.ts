import { EventCreationRequestDTO } from "../../../../domain/DTOs/organizer/events/EventCreationRequestDTO";
import { EventResponseDTO } from "../../../../domain/DTOs/organizer/events/EventResponseDTO";
import { IEventRepository } from "../../../../domain/repositories/organizer/IEventsRepository";
import { ICreateEventUseCase } from "../../../interface/organizer/events/ICreateEventUseCase";


export class CreateEventUseCase implements ICreateEventUseCase {
   constructor(
        private _eventRepository: IEventRepository
   ){}
   execute(data: EventCreationRequestDTO): Promise<EventResponseDTO> {
       
   }
}