import { NextFunction, Request, Response } from "express";
import { HandleStripeWebhookUseCase } from "../../../application/useCases/common/useCases/HandleStripeWebhookUseCase";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";
import { ResponseMessages } from "../../../infrastructure/constants/responseMessages";


export class StripeWebhookController {
  constructor(private readonly _handleStripeWebhookUseCase: HandleStripeWebhookUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const signature = req.headers["stripe-signature"] as string;

    try {
      await this._handleStripeWebhookUseCase.execute(req.body, signature);
     res.status(HttpStatusCode.OK).json(ApiResponse.success(ResponseMessages.WEBHOOK.RECEIVED, HttpStatusCode.OK))
    } catch (err) {
         next(err)
    }
  }
}
