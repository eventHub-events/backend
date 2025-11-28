import { EventCreationRequestDTO } from "../../../../DTOs/organizer/events/EventCreationRequestDTO";
import { EventResponseDTO } from "../../../../DTOs/organizer/events/EventResponseDTO";

export interface ICreateEventUseCase {
  execute(data: EventCreationRequestDTO) : Promise<EventResponseDTO>
}