import { ReportMapper } from '../../../application/mapper/common/report/ReportMapper';
import { CreateChatMessageReportUseCase } from '../../../application/useCases/common/report/chat/CreateChatMessageReportUseCase';
import { CreateEventReportUseCase } from '../../../application/useCases/common/report/user/CreateEventReportUseCase';
import { CreateOrganizerReportUseCase } from '../../../application/useCases/common/report/user/CreateOragnizerReportUseCase';
import { ConversationEntityFactory } from '../../../infrastructure/factories/common/ConversationEntityFactory';
import { MessageEntityFactory } from '../../../infrastructure/factories/common/MessageEntityFactory';
import { ReportEntityFactory } from '../../../infrastructure/factories/common/ReportEntityFactory';
import { BookingEntityFactory } from '../../../infrastructure/factories/user/BookingEntityFactory';
import { ConversationRePository } from '../../../infrastructure/repositories/common/ConversationRepository';
import { MessageRepository } from '../../../infrastructure/repositories/common/MessageRepository';
import { ReportRepository } from '../../../infrastructure/repositories/common/ReportRepository';
import { BookingRepository } from '../../../infrastructure/repositories/user/booking/BookingRepository';
import { ReportController } from '../../../interfaceAdapter/controllers/common/ReportController';

const reportEntityFactory = new ReportEntityFactory();
const reportRepository = new ReportRepository(reportEntityFactory);
const reportMapper = new ReportMapper();
const bookingEntityFactory = new BookingEntityFactory();
const bookingRepository = new BookingRepository(bookingEntityFactory);

const createOrganizerReportUseCase = new CreateOrganizerReportUseCase(
  reportRepository,
  reportMapper,
  bookingRepository
);
const createEventReportUseCase = new CreateEventReportUseCase(
  reportRepository,
  reportMapper,
  bookingRepository
);

const messageEntityFactory = new MessageEntityFactory();
const messageRepository = new MessageRepository(messageEntityFactory);

const conversationEntityFactory = new ConversationEntityFactory();
const conversationRepository = new ConversationRePository(
  conversationEntityFactory
);
const createChatMessageUseCase = new CreateChatMessageReportUseCase(
  messageRepository,
  conversationRepository,
  reportRepository,
  reportMapper
);

export const reportController = new ReportController(
  createOrganizerReportUseCase,
  createEventReportUseCase,
  createChatMessageUseCase
);
