import { ErrorMessages } from '../../../../constants/errorMessages';
import { NotFoundError } from '../../../../domain/errors/common';
import { IReviewRepository } from '../../../../domain/repositories/user/IReviewRepository';
import { ReviewType } from '../../../../infrastructure/types/review/review';
import { ReviewResponseDTO } from '../../../DTOs/common/review/reviewResponseDTO';
import { IReviewMapper } from '../../../interface/mapper/common/review/IReviewMapper';
import { IGetOrganizerReviewsUseCase } from '../../../interface/useCases/organizer/review/IGetOrganizerReviewsUseCase';

export class GetOrganizerReviewsUseCase implements IGetOrganizerReviewsUseCase {
  constructor(
    private _reviewRepo: IReviewRepository,
    private _reviewMapper: IReviewMapper
  ) {}
  async execute(
    targetId: string,
    targetType: ReviewType,
    page: string,
    limit: string
  ): Promise<{ reviews: ReviewResponseDTO[]; total: number }> {
    const { entity, total } = await this._reviewRepo.getReviewsForOrganizer(
      targetId,
      targetType,
      parseInt(page),
      parseInt(limit)
    );
    if (!entity)
      throw new NotFoundError(ErrorMessages.REVIEW.REVIEWS_NOT_FOUND);

    const reviews = this._reviewMapper.toResponseDTOList(entity);
    return { reviews, total };
  }
}
