import { EventTicketingRequestDTO } from "../../../../domain/DTOs/organizer/ticketing/EventTicketingRequestDTO";
import { EventTicketingResponseDTO } from "../../../../domain/DTOs/organizer/ticketing/EventTicketingResposeDTO";
import { IEventTicketingRepository } from "../../../../domain/repositories/organizer/IEventTicketingRepository";
import { ICreateTicketingUseCase } from "../../../interface/useCases/organizer/eventTicketing/ICreateTicketingUseCase";

export class CreateTicketingUseCase implements ICreateTicketingUseCase {
   constructor(
       private _ticketingRepository : IEventTicketingRepository,
       private _ticketingMapper : 
   ){}
  execute(dto: EventTicketingRequestDTO): Promise<EventTicketingResponseDTO> {
      
  }
}