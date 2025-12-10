import { ExportTransactionsReportUseCase } from "../../../application/useCases/admin/finance-payout/ExportTransactionsReportUseCase";
import { GetFinanceOverviewUseCase } from "../../../application/useCases/admin/finance-payout/GetFinanceOverviewUseCase";
import { GetTransactionsUseCase } from "../../../application/useCases/admin/finance-payout/GetTransactionsUseCase";
import { AdminFinanceQueryRepository } from "../../../infrastructure/repositories/admin/AdminFinanceQueryRepository";
import { PdfReportService } from "../../../infrastructure/services/pdfService/pdfReportService";

import { ExportFinancePayoutPDFController } from "../../../interfaceAdapter/controllers/admin/ExportFinancePayoutPDFController";
import { GetFinanceAndPayoutController} from "../../../interfaceAdapter/controllers/admin/GetFinanceOverviewController";


const financeRepo = new AdminFinanceQueryRepository();

const getFinanceOverviewUseCase = new GetFinanceOverviewUseCase(financeRepo);
const getTransactionsUseCase = new GetTransactionsUseCase(financeRepo);
export const getFinanceOverviewController = new GetFinanceAndPayoutController(getFinanceOverviewUseCase, getTransactionsUseCase);

const pdfReportService = new PdfReportService();

const exportTransactionsReportUseCase = new ExportTransactionsReportUseCase(financeRepo, pdfReportService);
export const exportFinancePayoutPDFController = new ExportFinancePayoutPDFController(exportTransactionsReportUseCase);