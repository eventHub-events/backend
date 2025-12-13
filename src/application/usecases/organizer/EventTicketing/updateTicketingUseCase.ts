import { EventTicketingEditDTO } from '../../../DTOs/organizer/ticketing/EventTicketingEditDTO';
import { EventTicketingResponseDTO } from '../../../DTOs/organizer/ticketing/EventTicketingResponseDTO';
import { IEventTicketingRepository } from '../../../../domain/repositories/organizer/IEventTicketingRepository';
import { ITicketingMapper } from '../../../interface/mapper/organizer/ITicketingMapper';
import { IUpdateTicketingUseCase } from '../../../interface/useCases/organizer/eventTicketing/IEditTicketingUseCase';

export class UpdateTicketingUseCase implements IUpdateTicketingUseCase {
  constructor(
    private _ticketingRepository: IEventTicketingRepository,
    private _ticketingMapper: ITicketingMapper
  ) {}
  async execute(
    eventId: string,
    dto: EventTicketingEditDTO
  ): Promise<EventTicketingResponseDTO> {
    const ticketingEntity = this._ticketingMapper.toEntityForUpdate(dto);
    const fetchedEntity =
      await this._ticketingRepository.findTicketingByEventId(eventId);

    const updateEntity = fetchedEntity.update(ticketingEntity);
    const updatedEntity =
      await this._ticketingRepository.updateTicketingByEventId(
        eventId,
        updateEntity
      );

    return this._ticketingMapper.toResponseDTO(updatedEntity);
  }
}
