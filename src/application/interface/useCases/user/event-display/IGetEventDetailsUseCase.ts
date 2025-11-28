import { EventDetailsResponseDTO } from "../../../../DTOs/user/event-display/EventDetailsResponseDTO";

export interface IGetEventDetailsUseCase {
  execute(eventId: string): Promise<EventDetailsResponseDTO>
}