import { ErrorMessages } from '../../../../../constants/errorMessages';
import {
  CreationFailedError,
  NotFoundError,
  UnauthorizedError,
} from '../../../../../domain/errors/common';
import { IBookingRepository } from '../../../../../domain/repositories/user/IBookingRepository';
import { IReviewRepository } from '../../../../../domain/repositories/user/IReviewRepository';
import { ReviewType } from '../../../../../infrastructure/types/review/review';
import { AddReviewDTO } from '../../../../DTOs/common/review/addReviewDTO';
import { ReviewResponseDTO } from '../../../../DTOs/common/review/reviewResponseDTO';
import { IAddOrganizerReviewUseCase } from '../../../../interface/common/useCase/review/organizer/IAddOrganizerReviewUseCase';
import { IReviewMapper } from '../../../../interface/mapper/common/review/IReviewMapper';

export class AddOrganizerReviewUseCase implements IAddOrganizerReviewUseCase {
  constructor(
    private _bookingRepo: IBookingRepository,
    private _reviewRepo: IReviewRepository,
    private _reviewMapper: IReviewMapper
  ) {}

  async execute(dto: AddReviewDTO): Promise<ReviewResponseDTO> {
    const hasBooked =
      await this._bookingRepo.findBookingsByOrganizerIdAndUserId(
        dto.targetId,
        dto.userId
      );
    if (!hasBooked)
      throw new NotFoundError(ErrorMessages.REVIEW.ORGANIZER_REVIEW_ERROR);

    const existing = await this._reviewRepo.findReviewByUserAndTarget(
      dto.userId,
      dto.targetId,
      ReviewType.ORGANIZER
    );
    if (existing)
      throw new UnauthorizedError(
        ErrorMessages.REVIEW.ALREADY_REVIEWED_ORGANIZER_ERROR
      );

    const reviewEntity = this._reviewMapper.toEntity(dto);
    const created = await this._reviewRepo.createReview(reviewEntity);
    if (!created)
      throw new CreationFailedError(
        ErrorMessages.REVIEW.REVIEW_CREATION_FAILED
      );

    return this._reviewMapper.toResponseDTO(created);
  }
}
