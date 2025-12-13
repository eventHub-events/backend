import { ReportMapper } from '../../../application/mapper/common/report/ReportMapper';
import { AdminActionTakenUseCase } from '../../../application/useCases/common/report/admin/AdminActionTakenUseCase';
import { GetReportsUseCase } from '../../../application/useCases/common/report/admin/GetReportsUseCase';
import { ReportEntityFactory } from '../../../infrastructure/factories/common/ReportEntityFactory';
import { ReportRepository } from '../../../infrastructure/repositories/common/ReportRepository';
import { ReportModerationEmailTemplate } from '../../../infrastructure/services/Templates/reportModerationEmailTemplate';
import { AdminReportController } from '../../../interfaceAdapter/controllers/admin/AdminReportController';
import {
  eventRepository,
  nodeMailerEmailService,
  userRepository,
} from '../../common/commonContainers';

const reportEntityFactory = new ReportEntityFactory();
const reportRepository = new ReportRepository(reportEntityFactory);
const reportMapper = new ReportMapper();

const reportModerationEmailTemplate = new ReportModerationEmailTemplate();

const adminActionTakenUseCase = new AdminActionTakenUseCase(
  reportRepository,
  eventRepository,
  userRepository,
  reportModerationEmailTemplate,
  nodeMailerEmailService
);
const getReportUseCase = new GetReportsUseCase(reportRepository, reportMapper);
export const adminReportController = new AdminReportController(
  getReportUseCase,
  adminActionTakenUseCase
);
