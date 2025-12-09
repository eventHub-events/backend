import { GetFinanceOverviewUseCase } from "../../../application/useCases/admin/finance-payout/GetFinanceOverviewUseCase";
import { GetTransactionsUseCase } from "../../../application/useCases/admin/finance-payout/GetTransactionsUseCase";
import { AdminFinanceQueryRepository } from "../../../infrastructure/repositories/admin/AdminFinanceQueryRepository";
import { GetFinanceAndPayoutController} from "../../../interfaceAdapter/controllers/admin/GetFinanceOverviewController";


const financeRepo = new AdminFinanceQueryRepository();

const getFinanceOverviewUseCase = new GetFinanceOverviewUseCase(financeRepo);
const getTransactionsUseCase = new GetTransactionsUseCase(financeRepo);
export const getFinanceOverviewController = new GetFinanceAndPayoutController(getFinanceOverviewUseCase, getTransactionsUseCase);