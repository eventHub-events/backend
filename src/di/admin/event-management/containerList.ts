import { EventModerationMapper } from "../../../application/mapper/admin/EventModerationMapper";
import { CreateEventModerationUseCase } from "../../../application/useCases/admin/event-management/createEventModerationUseCase";
import { FetchEventModerationByEventIdUseCase } from "../../../application/useCases/admin/event-management/fetchEventModerationUseCase";
import { UpdateEventModerationUseCase } from "../../../application/useCases/admin/event-management/updateEventModerationUseCase";
import { UpdateEventUseCase } from "../../../application/useCases/organizer/events/editEventUseCase";
import { EventModerationEntityFactory } from "../../../infrastructure/factories/admin/EventModerationEntityFactory";
import { EventModerationRepository } from "../../../infrastructure/repositories/admin/EventModerationRepository";
import { EventModerationController } from "../../../interfaceAdapter/controllers/admin/EventModerationController";
import { updatingEventUseCase } from "../../common/commonContainers";


const eventModerationEntityFactory  = new EventModerationEntityFactory();
const eventModerationRepository = new EventModerationRepository(eventModerationEntityFactory);
const eventModerationMapper = new EventModerationMapper();



const createEventModerationUseCase = new CreateEventModerationUseCase(eventModerationRepository, eventModerationMapper,updatingEventUseCase);
const updateEventModerationUseCase = new UpdateEventModerationUseCase(eventModerationRepository,eventModerationMapper,updatingEventUseCase);
const fetchEventModerationByEventIdUseCase = new  FetchEventModerationByEventIdUseCase(eventModerationRepository, eventModerationMapper);

export const eventModerationController = new EventModerationController(createEventModerationUseCase,updateEventModerationUseCase, fetchEventModerationByEventIdUseCase);

