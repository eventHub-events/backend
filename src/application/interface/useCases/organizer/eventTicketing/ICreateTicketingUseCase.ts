import { EventTicketingRequestDTO } from "../../../../../domain/DTOs/organizer/ticketing/EventTicketingRequestDTO";
import { EventTicketingResponseDTO } from "../../../../../domain/DTOs/organizer/ticketing/EventTicketingResposeDTO";

export interface ICreateTicketingUseCase {
  execute(dto: EventTicketingRequestDTO): Promise<EventTicketingResponseDTO>;
}