import { GetFinanceOverviewUseCase } from "../../../application/useCases/admin/finance-payout/GetFinanceOverviewUseCase";
import { AdminFinanceQueryRepository } from "../../../infrastructure/repositories/admin/AdminFinanceQueryRepository";
import { GetFinanceOverviewController } from "../../../interfaceAdapter/controllers/admin/GetFinanceOverviewController";


const financeRepo = new AdminFinanceQueryRepository();

const getFinanceOverviewUseCase = new GetFinanceOverviewUseCase(financeRepo);
export const getFinanceOverviewController = new GetFinanceOverviewController(getFinanceOverviewUseCase);