import { ReviewType } from "../../../../infrastructure/types/review/review";

export interface ReviewResponseDTO {
   id: string;
   targetType: ReviewType;
   rating: number;
   review: string
}