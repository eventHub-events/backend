import { EventTicketingEditDTO } from "../../../../DTOs/organizer/ticketing/EventTicketingEditDTO";
import { EventTicketingResponseDTO } from "../../../../DTOs/organizer/ticketing/EventTicketingResposeDTO";

export interface IUpdateTicketingUseCase {
  execute(eventId: string, dto:EventTicketingEditDTO):  Promise<EventTicketingResponseDTO>;
}