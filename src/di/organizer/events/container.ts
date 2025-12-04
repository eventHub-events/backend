import { EventMapper } from "../../../application/mapper/organizer/EventMapper";
import { HandleEventCancellationRefundUseCase } from "../../../application/useCases/common/event-cancel/HandleEventCancellationRefundUseCase";
import { CancelEventUseCase } from "../../../application/useCases/organizer/events/cancelEventUseCase";
import { CreateEventUseCase } from "../../../application/useCases/organizer/events/createEventUseCase";
import { DeleteEventUseCase } from "../../../application/useCases/organizer/events/deleteEventUseCase";
import { UpdateEventUseCase } from "../../../application/useCases/organizer/events/editEventUseCase";
import { GetAllEventUseCase } from "../../../application/useCases/organizer/events/getAllEventUseCase";
import { GetEventByIdUseCase } from "../../../application/useCases/organizer/events/getEventByIdUseCase";
import {  GetEventByOrganizerUseCase } from "../../../application/useCases/organizer/events/getEventByOrganizerUseCase";
import { EventModerationEntityFactory } from "../../../infrastructure/factories/admin/EventModerationEntityFactory";
import { EventEntityFactory } from "../../../infrastructure/factories/organizer/EventEntityFactory";
import { EventModerationRepository } from "../../../infrastructure/repositories/admin/EventModerationRepository";
import { EventRepository } from "../../../infrastructure/repositories/organizer/EventsRepository";
import { StripePaymentService } from "../../../infrastructure/services/StripeWebhookService/Stripe-payment/StripePaymentService";
import { EventManagementController } from "../../../interfaceAdapter/controllers/organizer/eventManagementController";
import { EventRetrievalController } from "../../../interfaceAdapter/controllers/organizer/eventRetrievalController";
import { bookingRepository } from "../../common/commonContainers";
 import dotenv from "dotenv";
 dotenv.config()

const eventEntityFactory = new EventEntityFactory();
const eventRepository = new EventRepository(eventEntityFactory);
const eventMapper = new EventMapper();
const eventModerationEntityFactory  = new EventModerationEntityFactory();
const eventModerationRepository = new EventModerationRepository(eventModerationEntityFactory);
const createEventUseCase  = new CreateEventUseCase(eventRepository, eventMapper, eventModerationRepository);
const updateEventUseCase = new UpdateEventUseCase(eventRepository, eventMapper);
const deleteEventUseCase = new DeleteEventUseCase(eventRepository);
 
 const stripePaymentService =  new StripePaymentService(process.env.STRIPE_SECRET_KEY!);
const handleEventCancellationRefundUseCase = new HandleEventCancellationRefundUseCase(bookingRepository,stripePaymentService);

const cancelEventUseCase = new CancelEventUseCase(eventRepository,handleEventCancellationRefundUseCase);

export const eventManagementController =  new EventManagementController(createEventUseCase, updateEventUseCase, deleteEventUseCase, cancelEventUseCase);

const getEventByIdUseCase = new GetEventByIdUseCase(eventRepository, eventMapper);
const getAllEventsUseCase = new GetAllEventUseCase(eventRepository, eventMapper);
const getEventsByOrganizerUseCase = new GetEventByOrganizerUseCase(eventRepository, eventMapper);

export const eventRetrievalController = new EventRetrievalController(getEventsByOrganizerUseCase, getEventByIdUseCase, getAllEventsUseCase);