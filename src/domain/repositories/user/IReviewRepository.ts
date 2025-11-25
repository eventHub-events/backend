import { ReviewType } from "../../../infrastructure/types/review/review";
import { RatingSummaryEntity } from "../../entities/user/RatingSummaryEntity";
import { ReviewEntity } from "../../entities/user/ReviewEntity";

export interface IReviewRepository {
   createReview(review: ReviewEntity): Promise<ReviewEntity>;
   updateReview(reviewId: string, data: ReviewEntity): Promise<ReviewEntity | null>;
   deleteReview(reviewId: string): Promise<boolean>;
   findReviewByUserAndTarget(userId: string, targetId: string, targetType: ReviewType): Promise<ReviewEntity| null>;
   getReviewsForTarget(targetId: string, targetType: ReviewType,page: number,limit: number): Promise<{entity:ReviewEntity[],hasMore: boolean}>;
   getReviewsById(reviewId: string): Promise<ReviewEntity>;
   getRatingSummary(targetId:string, targetType: ReviewType): Promise<RatingSummaryEntity>;
} 