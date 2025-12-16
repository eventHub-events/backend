import { EventDisplayMapper } from '../../../application/mapper/user/EventDisplayMapper';
import { GetAllFeaturedEventUseCase } from '../../../application/useCases/user/event-display/GetAllFeaturedEventUseCase';
import { GetEventDetailsUseCase } from '../../../application/useCases/user/event-display/GetEventDetailsUseCase';
import { GetFeaturedEventUseCase } from '../../../application/useCases/user/event-display/GetFeaturedEventsUseCase';
import { GetTrendingEventUseCase } from '../../../application/useCases/user/event-display/GetTrendingEventsUseCase';
import { GetUpcomingEventUseCase } from '../../../application/useCases/user/event-display/GetUpcomingEventUseCase';
import { SearchEventsUseCase } from '../../../application/useCases/user/event-display/SearchEventsUseCase';
import { EventDisplayQueryRepository } from '../../../infrastructure/repositories/user/events/EventDisplayQueryRepository';
import { EventDisplayController } from '../../../interfaceAdapter/controllers/user/EventDisplayController';

const eventDisplayQueryRepository = new EventDisplayQueryRepository();
const eventDisplayMapper = new EventDisplayMapper();
const getTrendingEventUseCase = new GetTrendingEventUseCase(
  eventDisplayQueryRepository,
  eventDisplayMapper
);
const getFeaturedEventUseCase = new GetFeaturedEventUseCase(
  eventDisplayQueryRepository,
  eventDisplayMapper
);
const getEventDetailsUseCase = new GetEventDetailsUseCase(
  eventDisplayQueryRepository,
  eventDisplayMapper
);
const getAllFeaturedEventUseCase = new GetAllFeaturedEventUseCase(
  eventDisplayQueryRepository,
  eventDisplayMapper
);

const searchEventsUseCase = new SearchEventsUseCase(
  eventDisplayQueryRepository,
  eventDisplayMapper
);
const getUpcomingEventUseCase = new GetUpcomingEventUseCase(eventDisplayQueryRepository);
export const eventDisplayController = new EventDisplayController(
  getTrendingEventUseCase,
  getFeaturedEventUseCase,
  getEventDetailsUseCase,
  getAllFeaturedEventUseCase,
  searchEventsUseCase,
  getUpcomingEventUseCase
);
