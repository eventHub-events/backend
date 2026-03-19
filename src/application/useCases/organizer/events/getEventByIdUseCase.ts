import { EventResponseDTO } from '../../../DTOs/organizer/events/EventResponseDTO';
import { IEventRepository } from '../../../../domain/repositories/organizer/IEventsRepository';
import { IEventMapper } from '../../../interface/useCases/organizer/events/IEventMapper';
import { IGetEventByIdUseCase } from '../../../interface/useCases/organizer/events/IGetEventByIdUseCase';
import { ErrorMessages } from '../../../../constants/errorMessages';
import { IEventTicketingRepository } from '../../../../domain/repositories/organizer/IEventTicketingRepository';
import { ITicketingMapper } from '../../../interface/mapper/organizer/ITicketingMapper';
import { EventTicketingResponseDTO } from '../../../DTOs/organizer/ticketing/EventTicketingResponseDTO';

export class GetEventByIdUseCase implements IGetEventByIdUseCase {
  constructor(
    private _eventRepository: IEventRepository,
    private _eventMapper: IEventMapper,
    private _ticketingRepo : IEventTicketingRepository,
    private _ticketMapper : ITicketingMapper
  ) {}

  async execute(eventId: string): Promise<{event:EventResponseDTO,tickets:EventTicketingResponseDTO}> {

    const[eventEntity,ticketEntity] =await  Promise.all([this._eventRepository.findEventById(eventId),this._ticketingRepo.findTicketingByEventId(eventId)])
    // const eventEntity = await this._eventRepository.findEventById(eventId);

    if (!eventEntity) throw new Error(ErrorMessages.EVENT.NOT_FOUND);
    if (!ticketEntity) throw new Error(ErrorMessages.TICKETING.DETAILS_NOT_FOUND);
    return {
     event: this._eventMapper.toResponseDTO(eventEntity),
     tickets: this._ticketMapper.toResponseDTO(ticketEntity)
    }
  }
}
