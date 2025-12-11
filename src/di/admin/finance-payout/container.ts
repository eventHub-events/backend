import { EventRevenueSummaryUseCase } from "../../../application/useCases/admin/finance-payout/EventRevenueSummaryUseCase";
import { ExportTransactionsReportUseCase } from "../../../application/useCases/admin/finance-payout/ExportTransactionsReportUseCase";
import { GetFinanceOverviewUseCase } from "../../../application/useCases/admin/finance-payout/GetFinanceOverviewUseCase";
import { GetPayoutOverviewUseCase } from "../../../application/useCases/admin/finance-payout/GetPayoutOverviewUseCase";
import { GetPayoutsUseCase } from "../../../application/useCases/admin/finance-payout/GetPayoutsUseCase";
import { GetRefundOverviewUseCase } from "../../../application/useCases/admin/finance-payout/GetRefundOverviewUseCase";
import { GetRefundsUseCase } from "../../../application/useCases/admin/finance-payout/GetRefundsUseCase";
import { GetSubscriptionOverviewUseCase } from "../../../application/useCases/admin/finance-payout/GetSubcriptionOverviewUseCas";
import { GetSubscriptionPlansUseCase } from "../../../application/useCases/admin/finance-payout/GetSubscriptionPlansUseCase";
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

const getPayoutsUseCase  = new GetPayoutsUseCase(financeRepo);
const getPayoutOverviewUseCase = new GetPayoutOverviewUseCase(financeRepo);
const eventRevenueSummaryUseCase = new EventRevenueSummaryUseCase(financeRepo);
const getSubscriptionPlansUseCase = new GetSubscriptionPlansUseCase(financeRepo);
const getSubscriptionOverviewUseCase = new GetSubscriptionOverviewUseCase(financeRepo);
export const getFinanceOverviewController = new GetFinanceAndPayoutController(getFinanceOverviewUseCase, getTransactionsUseCase, getRefundsUseCase, getRefundOverviewUseCase, getPayoutsUseCase,getPayoutOverviewUseCase, eventRevenueSummaryUseCase, getSubscriptionPlansUseCase, getSubscriptionOverviewUseCase);

const pdfReportService = new PdfReportService();

const exportTransactionsReportUseCase = new ExportTransactionsReportUseCase(financeRepo, pdfReportService);
export const exportFinancePayoutPDFController = new ExportFinancePayoutPDFController(exportTransactionsReportUseCase);