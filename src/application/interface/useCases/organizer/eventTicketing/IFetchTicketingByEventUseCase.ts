import { EventTicketingResponseDTO } from "../../../../../domain/DTOs/organizer/ticketing/EventTicketingResposeDTO";
import { EventTicketingEntity } from "../../../../../domain/entities/organizer/EventTicketingEntity";

export interface IFetchTicketingDetailsByEventUseCase {
  execute(eventId: string): Promise<EventTicketingResponseDTO>;
}