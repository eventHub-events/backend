import { ReviewType } from "../../../../../../infrastructure/types/review/review";
import { ReviewResponseDTO } from "../../../../../DTOs/common/review/reviewResponseDTO";

export interface IGetReviewsUseCase {
execute(targetId: string, targetType: ReviewType, page: string, limit: string, userId: string): Promise<{reviews:ReviewResponseDTO[],hasMore: boolean}>  ;
}