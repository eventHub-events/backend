import { ReviewType } from "../../../../../../infrastructure/types/review/review";
import { RatingSummaryResponseDTO } from "../../../../../DTOs/organizer/rating-review/RatingSummaryResponseDTO";

export interface IGetRatingSummaryUseCase {
  execute(targetId:string, targetType: ReviewType): Promise<RatingSummaryResponseDTO>;
}