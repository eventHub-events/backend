import { ReviewType } from '../../../../../infrastructure/types/review/review';
import { ReviewResponseDTO } from '../../../../DTOs/common/review/reviewResponseDTO';

export interface IGetOrganizerReviewsUseCase {
  execute(
    targetId: string,
    targetType: ReviewType,
    page: string,
    limit: string
  ): Promise<{ reviews: ReviewResponseDTO[]; total: number }>;
}
