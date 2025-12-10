import { ExportTransactionsReportUseCase } from "../../../application/useCases/admin/finance-payout/ExportTransactionsReportUseCase";
import { GetFinanceOverviewUseCase } from "../../../application/useCases/admin/finance-payout/GetFinanceOverviewUseCase";
import { GetRefundOverviewUseCase } from "../../../application/useCases/admin/finance-payout/GetRefundOverviewUseCase";
import { GetRefundsUseCase } from "../../../application/useCases/admin/finance-payout/GetRefundsUseCase";
import { GetTransactionsUseCase } from "../../../application/useCases/admin/finance-payout/GetTransactionsUseCase";
import { AdminFinanceQueryRepository } from "../../../infrastructure/repositories/admin/AdminFinanceQueryRepository";
import { PdfReportService } from "../../../infrastructure/services/pdfService/pdfReportService";

import { ExportFinancePayoutPDFController } from "../../../interfaceAdapter/controllers/admin/ExportFinancePayoutPDFController";
import { GetFinanceAndPayoutController} from "../../../interfaceAdapter/controllers/admin/GetFinanceOverviewController";


const financeRepo = new AdminFinanceQueryRepository();

const getFinanceOverviewUseCase = new GetFinanceOverviewUseCase(financeRepo);
const getTransactionsUseCase = new GetTransactionsUseCase(financeRepo);
const getRefundsUseCase  = new GetRefundsUseCase(financeRepo);
const getRefundOverviewUseCase = new GetRefundOverviewUseCase(financeRepo);
export const getFinanceOverviewController = new GetFinanceAndPayoutController(getFinanceOverviewUseCase, getTransactionsUseCase, getRefundsUseCase, getRefundOverviewUseCase);

const pdfReportService = new PdfReportService();

const exportTransactionsReportUseCase = new ExportTransactionsReportUseCase(financeRepo, pdfReportService);
export const exportFinancePayoutPDFController = new ExportFinancePayoutPDFController(exportTransactionsReportUseCase);