import { NextFunction, Response } from 'express';
import { IAuthenticatedRequest } from '../../../infrastructure/interface/IAuthenticatedRequest';
import { TransactionsFilter } from '../../../domain/interface/admin-finance-query/transactions';
import { ResponseMessages } from '../../../infrastructure/constants/responseMessages';
import { IExportTransactionsReportUseCase } from '../../../application/interface/useCases/admin/finance-payout/IExportTransactionsReportUseCase';

export class ExportFinancePayoutPDFController {
  constructor(
    private _exportTransactionReportUseCase: IExportTransactionsReportUseCase
  ) {}

  async exportTransactionPdf(
    req: IAuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const filter = req.validatedQuery as TransactionsFilter;

      const { pdfBuffer } =
        await this._exportTransactionReportUseCase.execute(filter);

      res.setHeader(
        ResponseMessages.TRANSACTION_PDF_REPORT.SET_HEADER_ONE,
        ResponseMessages.TRANSACTION_PDF_REPORT.ATTACHMENT
      );
      res.setHeader(
        ResponseMessages.TRANSACTION_PDF_REPORT.CONTENT_TYPE,
        ResponseMessages.TRANSACTION_PDF_REPORT.APPLICATION_PDF
      );

      return res.send(pdfBuffer);
    } catch (err) {
      next(err);
    }
  }
}
