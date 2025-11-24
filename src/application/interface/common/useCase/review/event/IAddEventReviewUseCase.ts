import { AddReviewDTO } from "../../../../../DTOs/common/review/addReviewDTO";
import { ReviewResponseDTO } from "../../../../../DTOs/common/review/reviewResponseDTO";

export interface IAddEventReviewUseCase {
  execute(eventId: string ,dto: AddReviewDTO): Promise<ReviewResponseDTO>;
}