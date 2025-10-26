import { GetTrendingEventUseCase } from "../../../application/useCases/user/event-display/GetTrendingEventsUseCase";
import { EventDisplayQueryRepository } from "../../../infrastructure/repositories/user/events/EventDisplayQueryRepository";
import { EventDisplayController } from "../../../interfaceAdapter/controllers/user/EventDisplayController";

const eventDisplayQueryRepository = new EventDisplayQueryRepository();
const getTrendingEventUseCase = new GetTrendingEventUseCase(eventDisplayQueryRepository);
export const eventDisplayController = new EventDisplayController(getTrendingEventUseCase);