import { ReviewType } from "../../../../../../infrastructure/types/review/review";

export interface IGetRatingSummaryUseCase {
  execute(targetId:string, targetType: ReviewType): Promise<any>;
}