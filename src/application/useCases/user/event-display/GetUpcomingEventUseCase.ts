import { ErrorMessages } from '../../../../constants/errorMessages';
import { UpcomingEventsDetails } from '../../../../domain/entities/user/UpcomingEventsDetails';
import { NotFoundError } from '../../../../domain/errors/common';
import { IEventDisplayQueryRepository } from '../../../../domain/repositories/user/IEventDisplayQueryRepository';
import { IGetUpcomingEventUseCase } from '../../../interface/useCases/user/event-display/IGetUpcomingEventUseCase';

export class GetUpcomingEventUseCase implements IGetUpcomingEventUseCase {
  constructor(private _eventDisplayQueryRepo: IEventDisplayQueryRepository) {}
  async execute(): Promise<UpcomingEventsDetails[]> {
    const result = await this._eventDisplayQueryRepo.upcomingEvents();
    
    if (!result)
      throw new NotFoundError(ErrorMessages.EVENT.UPCOMING_EVENT_NOT_FOUND);
    return result;
  }
}
