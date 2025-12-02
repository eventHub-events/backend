import {  Response, NextFunction } from "express";
import { IOrganizerVerificationUseCase } from "../../../application/interface/useCases/admin/IOrganizerVerificationUseCase";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";
import { UpdateOrganizerOverallVerificationStatusDTO } from "../../../application/DTOs/admin/OrganizerOverallVerificationDTO";
import { ZodError } from "zod";
import { IAuthenticatedRequest } from "../../../infrastructure/interface/IAuthenticatedRequest";
import { CustomError } from "../../../infrastructure/errors/errorClass";
import { ErrorMessages } from "../../../constants/errorMessages";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { ResponseMessages } from "../../../infrastructure/constants/responseMessages";

export class OrganizerVerificationController {
  constructor(
    private _organizerVerificationUseCase: IOrganizerVerificationUseCase
  ) {}

  async fetchOrganizerVerificationDetails(req: IAuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { organizerId } = req.params;

      if (!organizerId) throw new CustomError(ErrorMessages.ORGANIZER.ID_REQUIRED, HttpStatusCode.BAD_REQUEST);

      const organizerVerificationDetails = await this._organizerVerificationUseCase.getOrganizerVerificationDetails(organizerId);

      res.status(HttpStatusCode.OK).json(ApiResponse.success(ResponseMessages.ORGANIZER_VERIFICATION.ORGANIZER_VERIFICATION_DETAILS_FETCH_SUCCESS, HttpStatusCode.OK, organizerVerificationDetails));
    } catch (err) {
      next(err);
    }
  }

  async fetchPendingOrganizers(req: IAuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const pendingUsers = await this._organizerVerificationUseCase.getPendingOrganizers();

      res.status(HttpStatusCode.OK).json(ApiResponse.success(ResponseMessages.ORGANIZER_VERIFICATION.PENDING_ORGANIZERS_FETCH_SUCCESS, HttpStatusCode.OK, pendingUsers));
    } catch (err) {
      next(err);
    }
  }

  async fetchPendingOrganizersWithProfile(req: IAuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const usersWithProfile = await this._organizerVerificationUseCase.getPendingOrganizersWithProfile();

      res.status(HttpStatusCode.OK).json(ApiResponse.success(ResponseMessages.ORGANIZER_VERIFICATION.PENDING_ORGANIZERS_WITH_PROFILE_FETCH_SUCCESS, HttpStatusCode.OK, usersWithProfile));
    } catch (err) {
      next(err);
    }
  }

  async updateOrganizerUploadDocumentStatus(req: IAuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { organizerId, data } = req.body;

      if (!organizerId || !data) {
        throw new CustomError(ErrorMessages.COMMON.ORGANIZER_ID_UPDATE_DETAILS_REQUIRED, HttpStatusCode.BAD_REQUEST);
      }

      const updatedDocs = await this._organizerVerificationUseCase.updateDocumentStatus(organizerId, data);

      res.status(HttpStatusCode.OK).json(ApiResponse.success(ResponseMessages.UPLOAD_DOCUMENT.DOCUMENT_UPDATE_SUCCESS, HttpStatusCode.OK, updatedDocs));
    } catch (err) {
      next(err);
    }
  }

  async updateOverallVerificationStatus(req: IAuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { organizerId } = req.params;

      if (!organizerId) throw new CustomError(ErrorMessages.ORGANIZER.ID_REQUIRED, HttpStatusCode.BAD_REQUEST);

      const dto = UpdateOrganizerOverallVerificationStatusDTO.create(req.body);

      const result = await this._organizerVerificationUseCase.updateOverallVerificationStatus(organizerId, dto);

      res.status(HttpStatusCode.OK).json(ApiResponse.success(ResponseMessages.ORGANIZER_VERIFICATION.ORGANIZER_OVERALL_VERIFICATION_STATUS_UPDATE_SUCCESS, HttpStatusCode.OK, result));
    } catch (err) {
      if (err instanceof ZodError) {
         throw new CustomError(ErrorMessages.COMMON.INVALID_INPUT, HttpStatusCode.BAD_REQUEST);
      }

      next(err);
    }
  }
}
