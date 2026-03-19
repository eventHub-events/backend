import { EventResponseDTO } from '../../../DTOs/organizer/events/EventResponseDTO';
import { EventUpdateDTO } from '../../../DTOs/organizer/events/EventUpdateDTO';
import { IEventRepository } from '../../../../domain/repositories/organizer/IEventsRepository';
import { IUpdateEventUseCase } from '../../../interface/useCases/organizer/events/IEditEventUseCase';
import { IEventMapper } from '../../../interface/useCases/organizer/events/IEventMapper';
import { ErrorMessages } from '../../../../constants/errorMessages';
import { IEventTicketingRepository } from '../../../../domain/repositories/organizer/IEventTicketingRepository';
import { ITicketingMapper } from '../../../interface/mapper/organizer/ITicketingMapper';
import {  BadRequestError, NotFoundError, UpdateFailedError } from '../../../../domain/errors/common';


export class UpdateEventUseCase implements IUpdateEventUseCase {
  constructor(
    private _EventRepository: IEventRepository,
    private _eventMapper: IEventMapper,
    private _ticketingRepository : IEventTicketingRepository,
    private _ticketingMapper : ITicketingMapper
  ) {}

  async execute(
    eventId: string,
    data: EventUpdateDTO
  ): Promise<EventResponseDTO> {

    console.log("event data", data)
    const existingEvent = await this._EventRepository.findEventById(eventId);
    if(!existingEvent) throw new NotFoundError(ErrorMessages.EVENT.NOT_FOUND);

    const totalTicketSeats = data.tickets.reduce((sum, ticket) => sum+Number(ticket.totalSeats),0);
    
             if (totalTicketSeats > data.totalCapacity) {
        throw new BadRequestError(
           ErrorMessages.EVENT.MAX_CAPACITY_EXCEEDED
        );
      }
      const ticketData = {
          eventId,
          organizerId:data.organizerId,
          tickets: data.tickets,
          saleStartDate: data.saleStartDate,
          saleEndDate: data.saleEndDate,
          waitingListEnabled: data.waitingListEnabled
      }
      const ticketingEntity = this._ticketingMapper.toEntityForUpdate(ticketData);
      const fetchedEntity =
      await this._ticketingRepository.findTicketingByEventId(eventId);
       const updateTicketEntity = fetchedEntity.update(ticketingEntity);

    const eventEntity = this._eventMapper.toEntityForUpdate(data);

    const updatedEvent = { ...existingEvent, ...eventEntity };

    // const savedEvent = await this._EventRepository.updateEvent(
    //   eventId,
    //   updatedEvent
    // );
    // if (!savedEvent) throw new Error(ErrorMessages.EVENT.UPDATE_FAILED);
    
   const[event,ticket] = await Promise.all([this._EventRepository.updateEvent(eventId, updatedEvent),this._ticketingRepository.updateTicketingByEventId(eventId,updateTicketEntity)]);
    if(!event)throw new UpdateFailedError(ErrorMessages.EVENT.UPDATE_FAILED)
    return this._eventMapper.toResponseDTO(event);
  }
}
