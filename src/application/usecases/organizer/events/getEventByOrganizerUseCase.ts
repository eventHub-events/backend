import { EventResponseDTO } from '../../../DTOs/organizer/events/EventResponseDTO';
import { IEventRepository } from '../../../../domain/repositories/organizer/IEventsRepository';
import { ACTIVE_EVENTS_FILTER } from '../../../constants/organizer/events';
import { IEventMapper } from '../../../interface/useCases/organizer/events/IEventMapper';
import { IGetEventByOrganizerUseCase } from '../../../interface/useCases/organizer/events/IGetEventByOrganizer';

export class GetEventByOrganizerUseCase implements IGetEventByOrganizerUseCase {
  constructor(
    private _eventRepository: IEventRepository,
    private _eventMapper: IEventMapper
  ) {}
  async execute(organizerId: string): Promise<EventResponseDTO[]> {
    const eventEntities = await this._eventRepository.findEventsByOrganizerId(
      organizerId,
      ACTIVE_EVENTS_FILTER
    );

    return this._eventMapper.toResponseDTOList(eventEntities);
  }
}
