import { EventTicketingEditDTO } from "../../../../domain/DTOs/organizer/ticketing/EventTicketingEditDTO";
import { EventTicketingResponseDTO } from "../../../../domain/DTOs/organizer/ticketing/EventTicketingResposeDTO";
import { IEventTicketingRepository } from "../../../../domain/repositories/organizer/IEventTicketingRepository";
import { ITicketingMapper } from "../../../interface/mapper/organizer/ITicketingMapper";
import {  IUpdateTicketingUseCase } from "../../../interface/useCases/organizer/eventTicketing/IEditTicketingUseCase";

export class UpdateTicketingUseCase implements IUpdateTicketingUseCase {
   constructor(
       private _ticketingRepository : IEventTicketingRepository,
       private _ticketingMapper : ITicketingMapper
   ){}
  async execute(ticketingId: string, dto: EventTicketingEditDTO): Promise<EventTicketingResponseDTO> {

         const  ticketingEntity = this._ticketingMapper.toEntityForUpdate(dto);
         const fetchedEntity = await this._ticketingRepository.findTicketingById(ticketingId);

         const updateEntity =  fetchedEntity.update(ticketingEntity);
         const updatedEntity = await this._ticketingRepository.updateTicketing(ticketingId, updateEntity);

  return this._ticketingMapper.toResponseDTO(updatedEntity);

  }
}