import { EventResponseDTO } from "../../../../DTOs/organizer/events/EventResponseDTO";
import { EventUpdateDTO } from "../../../../DTOs/organizer/events/EventUpdateDTO";
import { EventEntity } from "../../../../../domain/entities/organizer/EventEntity";

export interface IUpdateEventUseCase {
  execute(eventId: string, data: EventUpdateDTO) : Promise<EventResponseDTO>;

}