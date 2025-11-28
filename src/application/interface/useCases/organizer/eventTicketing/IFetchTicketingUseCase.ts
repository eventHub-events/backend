import { EventTicketingResponseDTO } from "../../../../DTOs/organizer/ticketing/EventTicketingResposeDTO";

export interface IFetchTicketingUseCase {
  execute(ticketingId: string): Promise<EventTicketingResponseDTO | null>;
}