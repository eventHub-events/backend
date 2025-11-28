
import { IReviewEntityFactory } from "../../../../application/interface/factories/user/IReviewEntityFactory";
import { RatingSummaryEntity } from "../../../../domain/entities/user/RatingSummaryEntity";
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

async updateReview(reviewId: string, data:ReviewEntity): Promise<ReviewEntity | null> {

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
async getReviewsForTarget(targetId: string, targetType: ReviewType,page: number,limit: number): Promise<{entity:ReviewEntity[],hasMore: boolean}> {

  
    const {data, total} = await super.paginate({targetId, targetType},page,limit) as { data: ReviewDBModel[]; total: number }
    const entity = this._reviewEntityFactory.toDomainList(data);
    const hasMore= page*limit<total
    return {entity,hasMore}

}
async getReviewsForOrganizer(targetId: string, targetType: ReviewType,page: number,limit: number): Promise<{entity:ReviewEntity[],total: number}> {

  
    const {data, total} = await super.paginate({targetId, targetType},page,limit) as { data: ReviewDBModel[]; total: number }
    const entity = this._reviewEntityFactory.toDomainList(data);
    
    return {entity, total}

}
async getReviewsById(reviewId: string): Promise<ReviewEntity> {
     const doc = await super.findById(reviewId) as ReviewDBModel;
  return this._reviewEntityFactory.toDomain(doc);
}
 async getRatingSummary(targetId: string, targetType: ReviewType): Promise<RatingSummaryEntity> {
      const pipeline = [
         {$match: {targetId, targetType}},
         {$group: {
            _id: null,
            avgRating :{$avg: "$rating"},
            total:{$sum:1},
            stars: {
              $push: "$rating"
            }
         }}
      ];

      const result = await ReviewModel.aggregate(pipeline);
      console.log("rsult is", result)

    if(result.length === 0){
       return {
            averageRating: 0,
        totalReviews: 0,
        starDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
       }
    }
     const summary = result[0];
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    summary.stars.forEach((star: 1 | 2 | 3 | 4 | 5) => {
      distribution[star] += 1;
    });
  console.log("summary", summary)
  console.log("distribution", distribution)
    return {
      averageRating: summary.avgRating,
      totalReviews: summary.total,
      starDistribution: distribution
    };
  
 }
}