import { IReviewRepository } from "../../../../../domain/repositories/user/IReviewRepository";
import { ReviewType } from "../../../../../infrastructure/types/review/review";
import { IGetRatingSummaryUseCase } from "../../../../interface/common/useCase/review/common/IGetRatingSummaryUseCase";

export class GetRatingSummaryUseCase implements IGetRatingSummaryUseCase {
  constructor(
     private _reviewRepo : IReviewRepository
  ){}
  async execute(targetId: string, targetType: ReviewType): Promise<any> {
       return await this._reviewRepo.getRatingSummary(targetId, targetType);
  }
}