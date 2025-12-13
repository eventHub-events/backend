import { NextFunction, Request, Response } from 'express';
import { IVerificationRequestUseCase } from '../../../application/interface/useCases/organizer/IVerificationRequestUseCase';
import { CustomError } from '../../../infrastructure/errors/errorClass';
import { HttpStatusCode } from '../../../infrastructure/interface/enums/HttpStatusCode';
import { ApiResponse } from '../../../infrastructure/commonResponseModel/ApiResponse';
import { ErrorMessages } from '../../../constants/errorMessages';
import { ResponseMessages } from '../../../infrastructure/constants/responseMessages';

export class OrganizerDocumentVerificationRequestController {
  constructor(
    private _verificationRequestUseCase: IVerificationRequestUseCase
  ) {}

  async completeVerificationRequest(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { organizerId } = req.params;

      if (!organizerId) {
        throw new CustomError(
          ErrorMessages.ORGANIZER.ID_REQUIRED,
          HttpStatusCode.BAD_REQUEST
        );
      }
      const result = await this._verificationRequestUseCase.requestVerification(
        organizerId,
        req.body
      );
      return res
        .status(HttpStatusCode.OK)
        .json(
          ApiResponse.success(
            ResponseMessages.UPLOAD_DOCUMENT
              .DOCUMENT_VERIFICATION_REQUEST_SUCCESS,
            HttpStatusCode.OK,
            result
          )
        );
    } catch (err) {
      next(err);
    }
  }
}
