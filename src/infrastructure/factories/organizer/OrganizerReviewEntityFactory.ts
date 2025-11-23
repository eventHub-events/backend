import { IOrganizerReviewEntityFactory } from "../../../application/interface/factories/organizer/IOrganizerReviewEntityFactory";
import { ReviewEntity } from "../../../domain/entities/user/ReviewEntity";
import { OrganizerReviewModel } from "../../../domain/types/UserTypes";

export class OrganizerReviewEntityFactory implements IOrganizerReviewEntityFactory {
  toDomain(dbModel: OrganizerReviewModel): ReviewEntity {
    return new ReviewEntity({
      targetId: dbModel.organizerId,
      userId: dbModel.userId,
      rating : dbModel.rating,
      review: dbModel.review,
      createdAt :dbModel.createdAt,
      updatedAt : dbModel.updatedAt,
      id: dbModel._id.toString()
    }); 
  }
  toDomainList(dbModel: OrganizerReviewModel[]): ReviewEntity[] {
       return dbModel.map((m) => this.toDomain(m));
  }
}