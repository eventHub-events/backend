import mongoose, { Document, Schema } from 'mongoose';
import { ReviewType } from '../../../../types/review/review';

export interface IReview extends Document {
  userId: string;
  targetId: string;
  rating: number;
  targetType: ReviewType;
  review: string;
  createdAt?: Date;
  updatedAt?: Date;
  userName?: string;
}

export const reviewSchema = new Schema<IReview>(
  {
    userId: {
      type: String,
      required: true,
    },
    targetId: {
      type: String,
      required: true,
    },
    targetType: {
      type: String,
      enum: Object.values(ReviewType),
    },
    rating: {
      type: Number,
      default: 0,
    },
    userName: {
      type: String,
    },
    review: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const ReviewModel = mongoose.model<IReview>('Review', reviewSchema);
