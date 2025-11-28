import { NotFoundError } from "../../../../../domain/errors/common";
import { IReviewRepository } from "../../../../../domain/repositories/user/IReviewRepository";
import { ReviewType } from "../../../../../infrastructure/types/review/review";
import { ReviewResponseDTO } from "../../../../DTOs/common/review/reviewResponseDTO";
import { IGetReviewsUseCase } from "../../../../interface/common/useCase/review/common/IGetReviewsUseCase";
import { IReviewMapper } from "../../../../interface/mapper/common/review/IReviewMapper";

export class GetReviewsUseCase implements IGetReviewsUseCase {
   constructor(
       private _reviewRepo: IReviewRepository,
       private _reviewMapper : IReviewMapper
   ){}
  async execute(targetId: string, targetType: ReviewType, page: string, limit: string, userId: string): Promise<{reviews:ReviewResponseDTO[],hasMore: boolean}> {

       

      const  {entity, hasMore} = await this._reviewRepo.getReviewsForTarget(targetId, targetType, parseInt(page), parseInt(limit));
      
      
       const converted = this._reviewMapper.toResponseDTOList(entity);
     return {reviews: converted, hasMore}
  }
}