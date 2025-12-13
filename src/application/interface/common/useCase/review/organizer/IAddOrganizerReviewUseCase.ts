import { AddReviewDTO } from '../../../../../DTOs/common/review/addReviewDTO';
import { ReviewResponseDTO } from '../../../../../DTOs/common/review/reviewResponseDTO';

export interface IAddOrganizerReviewUseCase {
  execute(dto: AddReviewDTO): Promise<ReviewResponseDTO>;
}
