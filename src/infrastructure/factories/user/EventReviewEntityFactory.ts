import { IEventReviewEntityFactory } from "../../../application/interface/factories/user/IEventReviewEntityFactory";
import { ReviewEntity } from "../../../domain/entities/user/ReviewEntity";
import { EventReviewModel } from "../../../domain/types/UserTypes";

export class EventReviewEntityFactory implements IEventReviewEntityFactory  {
  toDomain(dbModel: EventReviewModel): ReviewEntity {
      return new ReviewEntity({
          targetId: dbModel.eventId,
          userId: dbModel.userId,
          rating : dbModel.rating,
          review: dbModel. review,
          createdAt: dbModel.createdAt,
          updatedAt: dbModel.updatedAt,
          id: dbModel._id.toString()
      });
  }
  toDomainList(dbModel: EventReviewModel[]): ReviewEntity[] {
      return dbModel.map((m) => this.toDomain(m));
  }
}