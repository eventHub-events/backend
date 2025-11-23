
import { IReviewEntityFactory } from "../../../../application/interface/factories/user/IReviewEntityFactory";
import { ReviewEntity } from "../../../../domain/entities/user/ReviewEntity";
import { IReviewRepository } from "../../../../domain/repositories/user/IReviewRepository";
import { ReviewDBModel } from "../../../../domain/types/UserTypes";

import { IReview, ReviewModel } from "../../../db/models/common/review/ReviewModel";
import { ReviewType } from "../../../types/review/review";

import { BaseRepository } from "../../BaseRepository";

export class ReviewRepository extends BaseRepository<IReview> implements IReviewRepository {
     constructor(
        private _reviewEntityFactory : IReviewEntityFactory
     ){
       super(ReviewModel)
     }
 async createReview(review: ReviewEntity): Promise<ReviewEntity> {

       const doc = await super.create(review) as ReviewDBModel;
   return this._reviewEntityFactory.toDomain(doc);

  }

async updateReview(reviewId: string, data: Partial<ReviewEntity>): Promise<ReviewEntity | null> {

    const doc = await super.update(reviewId, data) as ReviewDBModel;
  return doc? this._reviewEntityFactory.toDomain(doc): null;

}

async deleteReview(reviewId: string): Promise<boolean> {

    const result = await ReviewModel.findByIdAndDelete(reviewId);
  return !!result;

}
async findReviewByUserAndTarget(userId: string, targetId: string, targetType: ReviewType): Promise<ReviewEntity | null> {

    const doc  = await super.findOne({userId, targetId, targetType}) as ReviewDBModel;
  return doc? this._reviewEntityFactory.toDomain(doc): null;

}
async getReviewsForTarget(targetId: string, targetType: ReviewType): Promise<ReviewEntity[]> {

     const docs = await super.findAll({targetId, targetType}) as ReviewDBModel[];
  return this._reviewEntityFactory.toDomainList(docs);

}
}