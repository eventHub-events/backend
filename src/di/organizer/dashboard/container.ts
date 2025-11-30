import {  OrganizerDashboardUseCase } from "../../../application/useCases/organizer/dashboard/OrganizerDashboardUseCase";
import { BookingEntityFactory } from "../../../infrastructure/factories/user/BookingEntityFactory";
import { BookingRepository } from "../../../infrastructure/repositories/user/booking/BookingRepository";
import { OrganizerDashboardController } from "../../../interfaceAdapter/controllers/organizer/OrganizerDashboardController";

const bookingEntityFactory = new BookingEntityFactory();
const bookingRepository = new BookingRepository(bookingEntityFactory);

 const organizerDashboardUseCase = new OrganizerDashboardUseCase(bookingRepository);
export const organizerDashboardController = new OrganizerDashboardController(organizerDashboardUseCase);