import { ReviewType } from '../../../infrastructure/types/review/review';

export class ReviewEntity {
  public targetId: string;
  public userId: string;
  public rating: number;
  public review: string;
  public targetType: ReviewType;
  public createdAt?: Date;
  public updatedAt?: Date;
  public id?: string;
  public userName?: string;

  constructor(props: {
    targetId: string;
    userId: string;
    rating: number;
    review: string;
    targetType: ReviewType;
    createdAt?: Date;
    updatedAt?: Date;
    id?: string;
    userName?: string;
  }) {
    this.targetId = props.targetId;
    this.userId = props.userId;
    this.rating = props.rating;
    this.review = props.review;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.id = props.id;
    this.targetType = props.targetType;
    this.userName = props.userName;
  }
  update(data: { rating?: number; review?: string }) {
    if (data.rating !== undefined) {
      if (data.rating < 1 || data.rating > 5) {
        throw new Error('Rating must be between 1 and 5');
      }
      this.rating = data.rating;
    }
    if (data.review !== undefined) {
      this.review = data.review;
    }
    this.updatedAt = new Date();
  }
}
