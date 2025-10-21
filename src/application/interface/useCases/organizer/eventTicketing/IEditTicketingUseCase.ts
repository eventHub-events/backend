import { EventTicketingEditDTO } from "../../../../../domain/DTOs/organizer/ticketing/EventTicketingEditDTO";
import { EventTicketingResponseDTO } from "../../../../../domain/DTOs/organizer/ticketing/EventTicketingResposeDTO";

export interface IEditTicketingUseCase {
  execute(ticketingId: string, dto:EventTicketingEditDTO):  Promise<EventTicketingResponseDTO>;
}