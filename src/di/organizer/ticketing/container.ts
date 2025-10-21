import { TicketingMapper } from "../../../application/mapper/organizer/TicketingMapper";
import { CreateTicketingUseCase } from "../../../application/useCases/organizer/EventTicketing/createTicketingUseCase";
import { FetchTicketingDetailsByEventUseCase } from "../../../application/useCases/organizer/EventTicketing/fetchTicketingDetailsByEventUseCase";
import { FetchTicketingUseCase } from "../../../application/useCases/organizer/EventTicketing/fetchTicketingUseCase";
import { UpdateTicketingUseCase } from "../../../application/useCases/organizer/EventTicketing/updateTicketingUseCase";
import { EventTicketingEntityFactory } from "../../../infrastructure/factories/organizer/EventTicketingEntityFactory";
import { EventTicketingRepository } from "../../../infrastructure/repositories/organizer/EventTicketingRepository";
import { TicketingManagementController } from "../../../interfaceAdapter/controllers/organizer/ticketingManagementController";
import { TicketingRetrievalController } from "../../../interfaceAdapter/controllers/organizer/ticketingRetrievalController";

const eventTicketingEntityFactory = new EventTicketingEntityFactory();
const  ticketingRepository = new EventTicketingRepository(eventTicketingEntityFactory);
const ticketingMapper   = new TicketingMapper();
//  -------useCase dependency injection ---------//
const createTicketingUseCase = new CreateTicketingUseCase(ticketingRepository,ticketingMapper);
const updateTicketingUseCase  = new UpdateTicketingUseCase(ticketingRepository, ticketingMapper);
const fetchTicketingUseCase = new FetchTicketingUseCase(ticketingRepository, ticketingMapper);
const fetchTicketingByEventUseCase =  new FetchTicketingDetailsByEventUseCase(ticketingRepository, ticketingMapper);

// ----------controller dependency injection----------//
export const ticketingManagementController = new TicketingManagementController(createTicketingUseCase, updateTicketingUseCase);
export const ticketingRetrievalController = new  TicketingRetrievalController(fetchTicketingUseCase, fetchTicketingByEventUseCase);
