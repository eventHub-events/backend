import { EventAdminViewMapper } from "../../../application/mapper/admin/EventAdminViewMapper";
import { EventModerationMapper } from "../../../application/mapper/admin/EventModerationMapper";
import { ApproveEventUseCase } from "../../../application/useCases/admin/event-management/admin-actions/approveEventUseCase";
import { BlockEventUseCase } from "../../../application/useCases/admin/event-management/admin-actions/blockEventUseCase";
import { RejectEventUseCase } from "../../../application/useCases/admin/event-management/admin-actions/rejectEventUseCase";
import { UnblockEventUseCase } from "../../../application/useCases/admin/event-management/admin-actions/unblockEventUseCase";
import { CreateEventModerationUseCase } from "../../../application/useCases/admin/event-management/other/createEventModerationUseCase";
import { FetchEventModerationByEventIdUseCase } from "../../../application/useCases/admin/event-management/other/fetchEventModerationUseCase";

import { GetAllEventAdminUseCase } from "../../../application/useCases/admin/event-management/other/getAllEventUseCase";
import { UpdateEventModerationUseCase } from "../../../application/useCases/admin/event-management/other/updateEventModerationUseCase";


import { EventModerationEntityFactory } from "../../../infrastructure/factories/admin/EventModerationEntityFactory";
import { EventModerationRepository } from "../../../infrastructure/repositories/admin/EventModerationRepository";
import { EventQueryRepository } from "../../../infrastructure/repositories/admin/EventQueryRepository";
import { EventManagementQueryController } from "../../../interfaceAdapter/controllers/admin/eventManagementQueryController";
import { EventModerationActionsController } from "../../../interfaceAdapter/controllers/admin/EventModerationActionsController";
import { EventModerationController } from "../../../interfaceAdapter/controllers/admin/EventModerationController";
import { eventRepository, updatingEventUseCase } from "../../common/commonContainers";


const eventModerationEntityFactory  = new EventModerationEntityFactory();
const eventModerationRepository = new EventModerationRepository(eventModerationEntityFactory);
const eventModerationMapper = new EventModerationMapper();
const eventAdminViewMapper = new EventAdminViewMapper();
const eventQueryRepository = new EventQueryRepository();
const getAllEventUseCaseByAdmin = new GetAllEventAdminUseCase(eventQueryRepository, eventAdminViewMapper);

export const eventManagementQueryController  = new EventManagementQueryController(getAllEventUseCaseByAdmin);


const createEventModerationUseCase = new CreateEventModerationUseCase(eventModerationRepository, eventModerationMapper);
const updateEventModerationUseCase = new UpdateEventModerationUseCase(eventModerationRepository,eventModerationMapper,updatingEventUseCase);
const fetchEventModerationByEventIdUseCase = new  FetchEventModerationByEventIdUseCase(eventModerationRepository, eventModerationMapper);

// admin-actions
const approveEventUseCase = new ApproveEventUseCase(eventModerationRepository,eventModerationMapper, eventRepository)
const rejectEventUseCase = new RejectEventUseCase(eventModerationRepository,eventModerationMapper, eventRepository)
const blockEventUseCase = new BlockEventUseCase(eventModerationRepository,eventModerationMapper, eventRepository)
const unBlockEventUseCase = new UnblockEventUseCase(eventModerationRepository,eventModerationMapper, eventRepository)
export const eventModerationActionsController  = new EventModerationActionsController(approveEventUseCase, rejectEventUseCase, blockEventUseCase, unBlockEventUseCase)

export const eventModerationController = new EventModerationController(createEventModerationUseCase,updateEventModerationUseCase, fetchEventModerationByEventIdUseCase);

