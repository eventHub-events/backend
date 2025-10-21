import { EventTicketingResponseDTO } from "../../../../domain/DTOs/organizer/ticketing/EventTicketingResposeDTO";
import { IEventTicketingRepository } from "../../../../domain/repositories/organizer/IEventTicketingRepository";
import { ITicketingMapper } from "../../../interface/mapper/organizer/ITicketingMapper";
import { IFetchTicketingUseCase } from "../../../interface/useCases/organizer/eventTicketing/IFetchTicketingUseCase";

export class FetchTicketingUseCase implements IFetchTicketingUseCase {
   constructor(
       private _ticketingRepository : IEventTicketingRepository ,
       private _ticketingMapper : ITicketingMapper
   ){}
 async execute(ticketingId: string): Promise<EventTicketingResponseDTO> {
      
  const fetchedDoc = await this._ticketingRepository.findTicketingById(ticketingId);
    if (!fetchedDoc) {
         throw new Error("Ticketing details not found");
    }
  return this._ticketingMapper.toResponseDTO(fetchedDoc);
 }
}