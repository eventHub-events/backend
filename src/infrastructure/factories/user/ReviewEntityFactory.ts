import {  IReviewEntityFactory } from "../../../application/interface/factories/user/IReviewEntityFactory";
import { ReviewEntity } from "../../../domain/entities/user/ReviewEntity";
import {  ReviewDBModel } from "../../../domain/types/UserTypes";

export class ReviewEntityFactory implements IReviewEntityFactory  {
  toDomain(dbModel: ReviewDBModel): ReviewEntity {
      return new ReviewEntity({
          targetId: dbModel.targetId,
          userId: dbModel.userId,
          rating : dbModel.rating,
          review: dbModel. review,
          createdAt: dbModel.createdAt,
          updatedAt: dbModel.updatedAt,
          targetType : dbModel.targetType,
          id: dbModel._id.toString(),
          userName: dbModel.userName
      });
  }
  toDomainList(dbModel: ReviewDBModel[]): ReviewEntity[] {
      return dbModel.map((m) => this.toDomain(m));
  }
}