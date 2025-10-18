import { EventCreationRequestDTO } from "../../../../domain/DTOs/organizer/events/EventCreationRequestDTO";
import { EventResponseDTO } from "../../../../domain/DTOs/organizer/events/EventResponseDTO";

export interface ICreateEventUseCase {
  execute(data: EventCreationRequestDTO) : Promise<EventResponseDTO>
}