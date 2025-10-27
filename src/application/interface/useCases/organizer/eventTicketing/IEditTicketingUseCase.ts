import { EventTicketingEditDTO } from "../../../../../domain/DTOs/organizer/ticketing/EventTicketingEditDTO";
import { EventTicketingResponseDTO } from "../../../../../domain/DTOs/organizer/ticketing/EventTicketingResposeDTO";

export interface IUpdateTicketingUseCase {
  execute(eventId: string, dto:EventTicketingEditDTO):  Promise<EventTicketingResponseDTO>;
}