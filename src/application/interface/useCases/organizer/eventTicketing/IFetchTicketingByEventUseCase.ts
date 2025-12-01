import { EventTicketingResponseDTO } from "../../../../DTOs/organizer/ticketing/EventTicketingResponseDTO";


export interface IFetchTicketingDetailsByEventUseCase {
  execute(eventId: string): Promise<EventTicketingResponseDTO>;
}