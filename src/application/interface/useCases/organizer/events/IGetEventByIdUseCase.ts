import { EventResponseDTO } from '../../../../DTOs/organizer/events/EventResponseDTO';

export interface IGetEventByIdUseCase {
  execute(eventId: string): Promise<EventResponseDTO>;
}
