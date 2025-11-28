import { ReviewType } from "../../../../infrastructure/types/review/review";

export  interface AddReviewDTO {
  userId:string;
  targetId: string;
  targetType: ReviewType;
  rating: number;
  review : string;
  userName?: string;
}