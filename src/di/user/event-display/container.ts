import { EventDisplayMapper } from "../../../application/mapper/user/EventDisplayMapper";
import { GetFeaturedEventUseCase } from "../../../application/useCases/user/event-display/GetFeaturedEventsUseCase";
import { GetTrendingEventUseCase } from "../../../application/useCases/user/event-display/GetTrendingEventsUseCase";
import { EventDisplayQueryRepository } from "../../../infrastructure/repositories/user/events/EventDisplayQueryRepository";
import { EventDisplayController } from "../../../interfaceAdapter/controllers/user/EventDisplayController";

const eventDisplayQueryRepository = new EventDisplayQueryRepository();
const eventDisplayMapper = new EventDisplayMapper();
const getTrendingEventUseCase = new GetTrendingEventUseCase(eventDisplayQueryRepository, eventDisplayMapper);
const getFeaturedEventUseCase = new GetFeaturedEventUseCase(eventDisplayQueryRepository, eventDisplayMapper);
export const eventDisplayController = new EventDisplayController(getTrendingEventUseCase, getFeaturedEventUseCase);