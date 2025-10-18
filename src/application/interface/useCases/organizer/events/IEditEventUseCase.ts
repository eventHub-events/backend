import { EventResponseDTO } from "../../../../../domain/DTOs/organizer/events/EventResponseDTO";
import { EventUpdateDTO } from "../../../../../domain/DTOs/organizer/events/EventUpdateDTO";
import { EventEntity } from "../../../../../domain/entities/organizer/EventEntity";

export interface IEditEventUseCase {
  execute(eventId: string, data: EventUpdateDTO) : Promise<EventResponseDTO>;

}