import { ErrorMessages } from '../../../../constants/errorMessages';
import {
  BadRequestError,
  NotFoundError,
} from '../../../../domain/errors/common';
import { EventAnalyticsData } from '../../../../domain/interface/event-analytics/EventAnalysisData';
import { EventAnalyticsFilter } from '../../../../domain/interface/event-analytics/eventAnalyticsFilter';
import { IEventAnalyticsRepository } from '../../../../domain/repositories/common/IEventAnalyticsRepository';
import { IGetEventAnalyticsUseCase } from '../../../interface/useCases/common/event-analytics/IGetEventAnalyticsUseCase';

export class GetEventAnalyticsUseCase implements IGetEventAnalyticsUseCase {
  constructor(
    private readonly _eventAnalyticsRepository: IEventAnalyticsRepository
  ) {}

  async execute(
    filter: EventAnalyticsFilter,
    organizerId?: string
  ): Promise<EventAnalyticsData> {
    console.log('eventId', filter.eventId);
    console.log('eventId', organizerId);
    if (!filter.eventId) new BadRequestError(ErrorMessages.EVENT.ID_REQUIRED);
    const result = await this._eventAnalyticsRepository.getEventAnalytics(
      filter,
      organizerId
    );
    console.log('result is', result);

    if (!result)
      throw new NotFoundError(ErrorMessages.EVENT_ANALYTICS.DETAILS_NOT_FOUND);
    return result;
  }
}
