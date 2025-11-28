import { ReportMapper } from "../../../application/mapper/common/report/ReportMapper";
import { CreateEventReportUseCase } from "../../../application/useCases/common/report/user/CreateEventReportUseCase";
import { CreateOrganizerReportUseCase } from "../../../application/useCases/common/report/user/CreateOragnizerReportUseCase";
import { ReportEntityFactory } from "../../../infrastructure/factories/common/ReportEntityFactory";
import { BookingEntityFactory } from "../../../infrastructure/factories/user/BookingEntityFactory";
import { ReportRepository } from "../../../infrastructure/repositories/common/ReportRepository";
import { BookingRepository } from "../../../infrastructure/repositories/user/booking/BookingRepository";
import { ReportController } from "../../../interfaceAdapter/controllers/common/ReportController";

const reportEntityFactory = new ReportEntityFactory();
const reportRepository = new ReportRepository(reportEntityFactory);
const reportMapper =  new ReportMapper();
const bookingEntityFactory = new BookingEntityFactory();
const bookingRepository = new BookingRepository(bookingEntityFactory);

const createOrganizerReportUseCase = new CreateOrganizerReportUseCase(reportRepository, reportMapper,bookingRepository);
const createEventReportUseCase = new CreateEventReportUseCase(reportRepository, reportMapper,bookingRepository);

export const reportController = new ReportController(createOrganizerReportUseCase, createEventReportUseCase);


