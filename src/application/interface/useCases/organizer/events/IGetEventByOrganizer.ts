import { EventResponseDTO } from '../../../../DTOs/organizer/events/EventResponseDTO';

export interface IGetEventByOrganizerUseCase {
  execute(organizerId: string): Promise<EventResponseDTO[]>;
}
