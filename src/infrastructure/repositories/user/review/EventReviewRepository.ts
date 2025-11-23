import { IEventReviewEntityFactory } from "../../../../application/interface/factories/user/IEventReviewEntityFactory";
import { ReviewEntity } from "../../../../domain/entities/user/ReviewEntity";
import { IReviewRepository } from "../../../../domain/repositories/user/IReviewRepository";
import { EventReviewDBModel } from "../../../../domain/types/UserTypes";
import { EventReviewModel, IEventReview } from "../../../db/models/user/EventReviewModel";
import { BaseRepository } from "../../BaseRepository";

export class EventReviewRepository extends BaseRepository<IEventReview> implements IReviewRepository {
     constructor(
        private _eventReviewEntityFactory : IEventReviewEntityFactory
     ){
       super(EventReviewModel)
     }
 async createReview(review: ReviewEntity): Promise<ReviewEntity> {

       const doc = await super.create(review) as EventReviewDBModel;
   return this._eventReviewEntityFactory.toDomain(doc);

  }

async updateReview(reviewId: string, data: Partial<ReviewEntity>): Promise<ReviewEntity | null> {

    const doc = await super.update(reviewId,data) as EventReviewDBModel;
  return doc? this._eventReviewEntityFactory.toDomain(doc): null;

}

async deleteReview(reviewId: string): Promise<boolean> {

    const result = await EventReviewModel.findByIdAndDelete(reviewId);
  return !!result;

}
async findReviewByUserAndTarget(userId: string, targetId: string): Promise<ReviewEntity | null> {

    const doc  = await super.findOne({userId, targetId}) as EventReviewDBModel;
  return doc? this._eventReviewEntityFactory.toDomain(doc): null;

}
async getReviewsForTarget(targetId: string): Promise<ReviewEntity[]> {

     const docs = await super.findAll({targetId}) as EventReviewDBModel[];
  return this._eventReviewEntityFactory.toDomainList(docs);

}
}