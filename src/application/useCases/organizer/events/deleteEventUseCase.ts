import { ErrorMessages } from '../../../../constants/errorMessages';
import { IEventRepository } from '../../../../domain/repositories/organizer/IEventsRepository';
import { ResponseMessages } from '../../../../infrastructure/constants/responseMessages';
import { IDeleteEventUseCase } from '../../../interface/useCases/organizer/events/IDeleteEventUseCase';

export class DeleteEventUseCase implements IDeleteEventUseCase {
  constructor(private _eventRepository: IEventRepository) {}
  async execute(eventId: string): Promise<string> {
    const eventEntity = await this._eventRepository.findEventById(eventId);
    if (!eventEntity) throw new Error(ErrorMessages.EVENT.NOT_FOUND);
    eventEntity.delete();

    await this._eventRepository.updateEvent(eventId, eventEntity);
    return ResponseMessages.EVENT.EVENT_DELETE_SUCCESS;
  }
}
