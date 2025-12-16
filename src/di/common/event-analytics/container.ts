import { GetEventAnalyticsUseCase } from '../../../application/useCases/common/event-analytics/GetEventAnalyticsUseCase';
import { EventAnalyticsRepository } from '../../../infrastructure/repositories/common/EventAnalyticsRepository';
import { EventAnalyticsController } from '../../../interfaceAdapter/controllers/common/EventAnalyticsController';

const eventAnalyticsRepository = new EventAnalyticsRepository();
const getEventAnalyticsUseCase = new GetEventAnalyticsUseCase(
  eventAnalyticsRepository
);
export const eventAnalyticsController = new EventAnalyticsController(
  getEventAnalyticsUseCase
);
