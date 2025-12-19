import { ErrorMessages } from '../../../../../constants/errorMessages';
import { NotFoundError } from '../../../../../domain/errors/common';
import { IReviewRepository } from '../../../../../domain/repositories/user/IReviewRepository';
import { ReviewResponseDTO } from '../../../../DTOs/common/review/reviewResponseDTO';
import { UpdateReviewDTO } from '../../../../DTOs/common/review/updateReviewDTO';
import { IUpdateReviewUseCase } from '../../../../interface/common/useCase/review/common/IUpdateReviewUseCase';
import { IReviewMapper } from '../../../../interface/mapper/common/review/IReviewMapper';

export class UpdateReviewUseCase implements IUpdateReviewUseCase {
  constructor(
    private _reviewRepo: IReviewRepository,
    private _reviewMapper: IReviewMapper
  ) {}

  async execute(
    reviewId: string,
    dto: UpdateReviewDTO
  ): Promise<ReviewResponseDTO> {
    const existing = await this._reviewRepo.getReviewsById(reviewId);
    if (!existing) throw new NotFoundError(ErrorMessages.REVIEW.NOT_FOUND);

    existing.update(dto);

    const saved = await this._reviewRepo.updateReview(reviewId, existing);
    if (!saved) throw new Error(ErrorMessages.REVIEW.UPDATE_FAILED);

    return this._reviewMapper.toResponseDTO(saved);
  }
}
