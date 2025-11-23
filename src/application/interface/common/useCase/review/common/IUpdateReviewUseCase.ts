import { ReviewResponseDTO } from "../../../../../DTOs/common/review/reviewResponseDTO";
import { UpdateReviewDTO } from "../../../../../DTOs/common/review/updateReviewDTO";

export interface IUpdateReviewUseCase {
  execute(reviewId: string, dto: UpdateReviewDTO): Promise<ReviewResponseDTO>;
}