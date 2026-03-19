import { EventMapper } from '../../../application/mapper/organizer/EventMapper';
import { TicketingMapper } from '../../../application/mapper/organizer/TicketingMapper';
import { HandleEventCancellationRefundUseCase } from '../../../application/useCases/common/event-cancel/HandleEventCancellationRefundUseCase';
import { CancelEventUseCase } from '../../../application/useCases/organizer/events/cancelEventUseCase';
import { CreateEventUseCase } from '../../../application/useCases/organizer/events/createEventUseCase';
import { DeleteEventUseCase } from '../../../application/useCases/organizer/events/deleteEventUseCase';
import { UpdateEventUseCase } from '../../../application/useCases/organizer/events/editEventUseCase';
import { ExpiredEventUseCase } from '../../../application/useCases/organizer/events/expiredEventUseCase';
import { GetAllEventUseCase } from '../../../application/useCases/organizer/events/getAllEventUseCase';
import { GetEventByIdUseCase } from '../../../application/useCases/organizer/events/getEventByIdUseCase';
import { GetEventByOrganizerUseCase } from '../../../application/useCases/organizer/events/getEventByOrganizerUseCase';
import { ENV } from '../../../infrastructure/config/common/env';
import { EventModerationEntityFactory } from '../../../infrastructure/factories/admin/EventModerationEntityFactory';
import { EventEntityFactory } from '../../../infrastructure/factories/organizer/EventEntityFactory';
import { EventTicketingEntityFactory } from '../../../infrastructure/factories/organizer/EventTicketingEntityFactory';
import { OrganizerSubscriptionEntityFactory } from '../../../infrastructure/factories/organizer/OrganizerSubscriptionEntityFactory';
import { CronEventLifecycleJob } from '../../../infrastructure/jobs/CroneEventLifecycleJob';
import { EventModerationRepository } from '../../../infrastructure/repositories/admin/EventModerationRepository';
import { EventRepository } from '../../../infrastructure/repositories/organizer/EventsRepository';
import { EventTicketingRepository } from '../../../infrastructure/repositories/organizer/EventTicketingRepository';
import { OrganizerSubscriptionRepository } from '../../../infrastructure/repositories/organizer/OrganizerSubscriptionRepository';
import { StripePaymentService } from '../../../infrastructure/services/StripeWebhookService/Stripe-payment/StripePaymentService';
import { EventManagementController } from '../../../interfaceAdapter/controllers/organizer/eventManagementController';
import { EventRetrievalController } from '../../../interfaceAdapter/controllers/organizer/eventRetrievalController';
import { bookingRepository } from '../../common/commonContainers';

const eventEntityFactory = new EventEntityFactory();
const eventRepository = new EventRepository(eventEntityFactory);
const eventMapper = new EventMapper();
const eventModerationEntityFactory = new EventModerationEntityFactory();
const eventModerationRepository = new EventModerationRepository(
  eventModerationEntityFactory
);
const ticketingMapper = new TicketingMapper();
const subscriptionEntityFactory = new OrganizerSubscriptionEntityFactory();
const subscriptionRepository = new OrganizerSubscriptionRepository(
  subscriptionEntityFactory
);
const eventTicketingEntityFactory = new EventTicketingEntityFactory();
const ticketingRepository = new EventTicketingRepository(
  eventTicketingEntityFactory
);
const createEventUseCase = new CreateEventUseCase(
  eventRepository,
  eventMapper,
  eventModerationRepository,
  ticketingRepository,
  ticketingMapper,
  subscriptionRepository
);
const updateEventUseCase = new UpdateEventUseCase(eventRepository, eventMapper,ticketingRepository,ticketingMapper);
const deleteEventUseCase = new DeleteEventUseCase(eventRepository);

const stripePaymentService = new StripePaymentService(ENV.STRIPE_SECRET_KEY!);
const handleEventCancellationRefundUseCase =
  new HandleEventCancellationRefundUseCase(
    bookingRepository,
    stripePaymentService
  );

const cancelEventUseCase = new CancelEventUseCase(
  eventRepository,
  handleEventCancellationRefundUseCase
);

export const eventManagementController = new EventManagementController(
  createEventUseCase,
  updateEventUseCase,
  deleteEventUseCase,
  cancelEventUseCase
);

const getEventByIdUseCase = new GetEventByIdUseCase(
  eventRepository,
  eventMapper,
  ticketingRepository,
  ticketingMapper
);
const getAllEventsUseCase = new GetAllEventUseCase(
  eventRepository,
  eventMapper
);
const getEventsByOrganizerUseCase = new GetEventByOrganizerUseCase(
  eventRepository,
  eventMapper
);

export const eventRetrievalController = new EventRetrievalController(
  getEventsByOrganizerUseCase,
  getEventByIdUseCase,
  getAllEventsUseCase
);
const expiredEventUseCase  = new ExpiredEventUseCase(eventRepository)
export const eventExpiryJob = new CronEventLifecycleJob(undefined,expiredEventUseCase)

