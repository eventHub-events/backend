import { EventCreationRequestDTO } from '../../../DTOs/organizer/events/EventCreationRequestDTO';
import { EventResponseDTO } from '../../../DTOs/organizer/events/EventResponseDTO';
import { EventApprovalStatus } from '../../../../domain/enums/organizer/events';
import { IEventModerationRepository } from '../../../../domain/repositories/admin/IEventModerationRepository';
import { IEventRepository } from '../../../../domain/repositories/organizer/IEventsRepository';
import { ICreateEventUseCase } from '../../../interface/useCases/organizer/events/ICreateEventUseCase';
import { IEventMapper } from '../../../interface/useCases/organizer/events/IEventMapper';
import { ErrorMessages } from '../../../../constants/errorMessages';
import { IEventTicketingRepository } from '../../../../domain/repositories/organizer/IEventTicketingRepository';
import { ITicketingMapper } from '../../../interface/mapper/organizer/ITicketingMapper';
import { IOrganizerSubscriptionRepository } from '../../../../domain/repositories/organizer/IOrganizerSubscriptionRepository';
import { SubscriptionStatus } from '../../../../domain/enums/organizer/subscription';
import { BadRequestError, CreationFailedError } from '../../../../domain/errors/common';

export class CreateEventUseCase implements ICreateEventUseCase {
  constructor(
    private _eventRepository: IEventRepository,
    private _eventMapper: IEventMapper,
    private _eventModerationRepository: IEventModerationRepository,
    private _ticketingRepository: IEventTicketingRepository,
    private _ticketingMapper: ITicketingMapper,
    private _subscriptionRepository: IOrganizerSubscriptionRepository
  ) {}
  async execute(data: EventCreationRequestDTO): Promise<EventResponseDTO> {
    console.log("data is", data)
     const subscription = await this._subscriptionRepository.getSubscriptionByOrganizerId(data.organizerId,SubscriptionStatus.Active);
     if(!subscription|| subscription.endDate!< new Date())throw new BadRequestError(ErrorMessages.SUBSCRIPTION.SUBSCRIPTION_REQUIRED);

     const totalTicketSeats = data.tickets.reduce((sum, ticket) => sum+Number(ticket.totalSeats),0);

         if (totalTicketSeats > data.totalCapacity) {
    throw new BadRequestError(
       ErrorMessages.EVENT.MAX_CAPACITY_EXCEEDED
    );
  }
        
    const eventEntity = this._eventMapper.toEntity(data);
     
    const eventData = await this._eventRepository.createEvent(eventEntity);
    if (!eventData || !eventData.eventId) {
  throw new CreationFailedError(ErrorMessages.EVENT.CREATION_FAILED);
}
    
    const ticketEntity = this._ticketingMapper.toEntity(
      {
        eventId : eventData.eventId?.toString(),
        organizerId: data.organizerId,
        tickets : data.tickets,
        saleStartDate : data.saleStartDate,
        saleEndDate : data.saleEndDate,
        waitingListEnabled:data.waitingListEnabled
      }
    )
    const ticketCreated = await this._ticketingRepository.createTicketing(ticketEntity);
    if (!ticketCreated) {
      await this._eventRepository.deleteEvent(eventData.eventId.toString());
      throw new CreationFailedError(ErrorMessages.TICKETING.CREATION_FAILED);
    }
    
   
    const payload = this._eventMapper.toBlankModerationEntity(
      eventData.eventId!,
      EventApprovalStatus.Pending
    );
    await this._eventModerationRepository.createEventModeration(payload);

    return this._eventMapper.toResponseDTO(eventData);
  }
}
