import { EventDetailsResponseDTO } from "../../../../../domain/DTOs/user/event-display/EventDetailsResponseDTO";

export interface IGetEventDetailsUseCase {
  execute(eventId: string): Promise<EventDetailsResponseDTO>
}