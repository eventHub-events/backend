import { EventResponseDTO } from '../../../../DTOs/organizer/events/EventResponseDTO';
import { EventTicketingResponseDTO } from '../../../../DTOs/organizer/ticketing/EventTicketingResponseDTO';

export interface IGetEventByIdUseCase {
  execute(eventId: string): Promise<{event:EventResponseDTO,tickets:EventTicketingResponseDTO}>
}
