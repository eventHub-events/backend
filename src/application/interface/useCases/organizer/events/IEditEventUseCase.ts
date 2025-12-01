import { EventResponseDTO } from "../../../../DTOs/organizer/events/EventResponseDTO";
import { EventUpdateDTO } from "../../../../DTOs/organizer/events/EventUpdateDTO";


export interface IUpdateEventUseCase {
  execute(eventId: string, data: EventUpdateDTO) : Promise<EventResponseDTO>;

}