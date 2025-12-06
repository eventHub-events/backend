import { ErrorMessages } from "../../../../../constants/errorMessages";
import { NotFoundError } from "../../../../../domain/errors/common";
import { IReviewRepository } from "../../../../../domain/repositories/user/IReviewRepository";
import { IDeleteReviewUseCase } from "../../../../interface/common/useCase/review/common/IDeleteReviewUseCase";

export class DeleteReviewUseCase implements IDeleteReviewUseCase {
   constructor(
      private _reviewRepo: IReviewRepository
   ){}

 async execute(reviewId: string): Promise<boolean> {

     const existing = await this._reviewRepo.getReviewsById(reviewId);
       if(!existing) throw new NotFoundError(ErrorMessages.REVIEW.NOT_FOUND);
     
      return this._reviewRepo.deleteReview(reviewId);
 }
}