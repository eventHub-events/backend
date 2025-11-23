import { ReviewType } from "../../../infrastructure/types/review/review";
import { ReviewEntity } from "../../entities/user/ReviewEntity";

export interface IReviewRepository {
   createReview(review: ReviewEntity): Promise<ReviewEntity>;
   updateReview(reviewId: string, data:Partial<ReviewEntity>): Promise<ReviewEntity | null>;
   deleteReview(reviewId: string): Promise<boolean>;
   findReviewByUserAndTarget(userId: string, targetId: string, targetType: ReviewType): Promise<ReviewEntity| null>;
   getReviewsForTarget(targetId: string, targetType: ReviewType): Promise<ReviewEntity[]>;
} 