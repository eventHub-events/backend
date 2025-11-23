import { ReviewType } from "../../../../infrastructure/types/review/review";

export interface UpdateReviewDTO {
   
   review?: string;
   rating?:number;
   id?:string;
   targetType?:ReviewType;
}