import { EventTicketingRequestDTO } from '../../../DTOs/organizer/ticketing/EventTicketingRequestDTO';
import { EventTicketingResponseDTO } from '../../../DTOs/organizer/ticketing/EventTicketingResponseDTO';
import { IEventTicketingRepository } from '../../../../domain/repositories/organizer/IEventTicketingRepository';
import { ITicketingMapper } from '../../../interface/mapper/organizer/ITicketingMapper';
import { ICreateTicketingUseCase } from '../../../interface/useCases/organizer/eventTicketing/ICreateTicketingUseCase';

export class CreateTicketingUseCase implements ICreateTicketingUseCase {
  constructor(
    private _ticketingRepository: IEventTicketingRepository,
    private _ticketingMapper: ITicketingMapper
  ) {}
  async execute(
    dto: EventTicketingRequestDTO
  ): Promise<EventTicketingResponseDTO> {
    const ticketingEntity = this._ticketingMapper.toEntity(dto);
    const created =
      await this._ticketingRepository.createTicketing(ticketingEntity);
    return this._ticketingMapper.toResponseDTO(created);
  }
}
