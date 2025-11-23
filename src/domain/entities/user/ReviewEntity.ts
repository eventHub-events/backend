import { ReviewType } from "../../../infrastructure/types/review/review";

export class ReviewEntity {
  public targetId :string;
  public userId :string;
  public rating :number;
  public review : string;
  public targetType: ReviewType;
  public createdAt?: Date;
  public updatedAt? : Date;
  public id?: string;

  constructor(
     props: {
      targetId: string,
      userId :string;
      rating : number;
      review : string;
      targetType: ReviewType;
      createdAt?: Date;
      updatedAt?: Date;
      id?: string;
     }
  ){
     this.targetId  = props.targetId;
     this.userId  = props.userId;
     this.rating = props.rating;
     this.review = props.review;
     this.createdAt = props.createdAt;
     this.updatedAt = props.updatedAt;
     this.id = props.id;
     this.targetType = props.targetType
  }
}