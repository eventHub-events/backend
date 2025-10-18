import { EventResponseDTO } from "../../../../../domain/DTOs/organizer/events/EventResponseDTO";

export interface IGetEventByOrganizer {
  execute(organizerId: string): Promise<EventResponseDTO[]>;
}