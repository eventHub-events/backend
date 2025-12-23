import { NextFunction, Response } from 'express';
import { IDeleteReviewUseCase } from '../../../application/interface/common/useCase/review/common/IDeleteReviewUseCase';
import { IGetReviewsUseCase } from '../../../application/interface/common/useCase/review/common/IGetReviewsUseCase';
import { IUpdateReviewUseCase } from '../../../application/interface/common/useCase/review/common/IUpdateReviewUseCase';
import { IAddEventReviewUseCase } from '../../../application/interface/common/useCase/review/event/IAddEventReviewUseCase';
import { IAddOrganizerReviewUseCase } from '../../../application/interface/common/useCase/review/organizer/IAddOrganizerReviewUseCase';
import { IAuthenticatedRequest } from '../../../infrastructure/interface/IAuthenticatedRequest';
import { AddReviewDTO } from '../../../application/DTOs/common/review/addReviewDTO';
import { HttpStatusCode } from '../../../infrastructure/interface/enums/HttpStatusCode';
import { ApiResponse } from '../../../infrastructure/commonResponseModel/ApiResponse';
import { ResponseMessages } from '../../../infrastructure/constants/responseMessages';
import { UpdateReviewDTO } from '../../../application/DTOs/common/review/updateReviewDTO';
import { CustomError } from '../../../infrastructure/errors/errorClass';
import { IGetRatingSummaryUseCase } from '../../../application/interface/common/useCase/review/common/IGetRatingSummaryUseCase';
import { ReviewType } from '../../../infrastructure/types/review/review';
import { BadRequestError, NotFoundError } from '../../../domain/errors/common';
import { IGetOrganizerReviewsUseCase } from '../../../application/interface/useCases/organizer/review/IGetOrganizerReviewsUseCase';
import { ErrorMessages } from '../../../constants/errorMessages';

export class ReviewController {
  constructor(
    private _addEventReviewUseCase: IAddEventReviewUseCase,
    private _addOrganizerReviewUseCase: IAddOrganizerReviewUseCase,
    private _updateReviewUseCase: IUpdateReviewUseCase,
    private _deleteReviewUseCase: IDeleteReviewUseCase,
    private _getReviewsUseCase: IGetReviewsUseCase,
    private _getRatingSummaryUseCase: IGetRatingSummaryUseCase,
    private _getReviewsForOrganizerUseCase: IGetOrganizerReviewsUseCase
  ) {}

  async addEventReview(
    req: IAuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { eventId } = req.params;
      const dto: AddReviewDTO = req.body;
      const result = await this._addEventReviewUseCase.execute(eventId, dto);
      res
        .status(HttpStatusCode.CREATED)
        .json(
          ApiResponse.success(
            ResponseMessages.REVIEW.REVIEW_CREATION_SUCCESS,
            HttpStatusCode.CREATED,
            result
          )
        );
    } catch (err) {
      if (err instanceof NotFoundError)
        throw new CustomError(err.message, HttpStatusCode.BAD_REQUEST);
      if (err instanceof BadRequestError)
        throw new CustomError(err.message, HttpStatusCode.BAD_REQUEST);
      next(err);
    }
  }
  async addOrganizerReview(
    req: IAuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const dto: AddReviewDTO = req.body;
      const result = await this._addOrganizerReviewUseCase.execute(dto);
      res
        .status(HttpStatusCode.CREATED)
        .json(
          ApiResponse.success(
            ResponseMessages.REVIEW.REVIEW_CREATION_SUCCESS,
            HttpStatusCode.CREATED,
            result
          )
        );
    } catch (err) {
      if (err instanceof NotFoundError)
        throw new CustomError(err.message, HttpStatusCode.BAD_REQUEST);
      if (err instanceof BadRequestError)
        throw new CustomError(err.message, HttpStatusCode.BAD_REQUEST);
      next(err);
    }
  }
  async updateReview(
    req: IAuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const dto: UpdateReviewDTO = req.body;
      const { reviewId } = req.params;
      if (!reviewId)
        throw new CustomError(
          ErrorMessages.REVIEW.ID_REQUIRED,
          HttpStatusCode.BAD_REQUEST
        );

      const result = await this._updateReviewUseCase.execute(reviewId, dto);
      res
        .status(HttpStatusCode.OK)
        .json(
          ApiResponse.success(
            ResponseMessages.REVIEW.REVIEW_UPDATE_SUCCESS,
            HttpStatusCode.OK,
            result
          )
        );
    } catch (err) {
      if (err instanceof NotFoundError)
        throw new CustomError(err.message, HttpStatusCode.BAD_REQUEST);
      next(err);
    }
  }

  async deleteReview(
    req: IAuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { reviewId } = req.params;
      if (!reviewId)
        throw new CustomError(
          ErrorMessages.REVIEW.ID_REQUIRED,
          HttpStatusCode.BAD_REQUEST
        );
      await this._deleteReviewUseCase.execute(reviewId);

      res
        .status(HttpStatusCode.OK)
        .json(
          ApiResponse.success(
            ResponseMessages.REVIEW.REVIEW_DELETION_SUCCESS,
            HttpStatusCode.OK
          )
        );
    } catch (err) {
      if (err instanceof NotFoundError)
        throw new CustomError(err.message, HttpStatusCode.BAD_REQUEST);
      next(err);
    }
  }
  async fetchReviews(
    req: IAuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { targetId, targetType } = req.params;
      const { page = 1, limit = 5 } = req.query;
      const userId = req.user?.id;
      if (!targetId)
        throw new CustomError(
          ErrorMessages.REVIEW.TARGET_ID_REQUIRED,
          HttpStatusCode.BAD_REQUEST
        );
      if (!userId)
        throw new CustomError(
          ErrorMessages.USER.ID_REQUIRED,
          HttpStatusCode.BAD_REQUEST
        );

      const result = await this._getReviewsUseCase.execute(
        targetId,
        targetType as ReviewType,
        page as string,
        limit as string,
        userId
      );

      res
        .status(HttpStatusCode.OK)
        .json(
          ApiResponse.success(
            ResponseMessages.REVIEW.REVIEWS_FETCH_SUCCESS,
            HttpStatusCode.OK,
            result
          )
        );
    } catch (err) {
      next(err);
    }
  }
  async getSummary(
    req: IAuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { targetId, targetType } = req.params;

      const result = await this._getRatingSummaryUseCase.execute(
        targetId,
        targetType as ReviewType
      );
      res
        .status(HttpStatusCode.OK)
        .json(
          ApiResponse.success(
            ResponseMessages.REVIEW.REVIEW_SUMMARY_SUCCESS,
            HttpStatusCode.OK,
            result
          )
        );
    } catch (err) {
      next(err);
    }
  }
  async fetchReviewsForOrganizerEvents(
    req: IAuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { targetId, targetType } = req.params;
      const { page = 1, limit = 5 } = req.query;

      if (!targetId)
        throw new CustomError(
          ErrorMessages.REVIEW.TARGET_ID_REQUIRED,
          HttpStatusCode.BAD_REQUEST
        );
      const result = await this._getReviewsForOrganizerUseCase.execute(
        targetId,
        targetType as ReviewType,
        page as string,
        limit as string
      );

      res
        .status(HttpStatusCode.OK)
        .json(
          ApiResponse.success(
            ResponseMessages.REVIEW.REVIEWS_FETCH_SUCCESS,
            HttpStatusCode.OK,
            result
          )
        );
    } catch (err) {
      next(err);
    }
  }
}
