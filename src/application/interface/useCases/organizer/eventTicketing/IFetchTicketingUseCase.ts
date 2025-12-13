import { EventTicketingResponseDTO } from '../../../../DTOs/organizer/ticketing/EventTicketingResponseDTO';

export interface IFetchTicketingUseCase {
  execute(ticketingId: string): Promise<EventTicketingResponseDTO | null>;
}
