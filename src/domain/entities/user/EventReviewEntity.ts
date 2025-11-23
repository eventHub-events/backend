export class EventReviewEntity {
  public eventId :string;
  public userId :string;
  public rating :number;
  public review : string;
  public createdAt?: Date;
  public updatedAt? : Date;

  constructor(
     props: {
      eventId: string,
      userId :string;
      rating : number;
      review : string;
      createdAt?: Date;
      updatedAt?: Date;
     }
  ){
     this.eventId  = props.eventId;
     this.userId  = props.userId;
     this.rating = props.rating;
     this.review = props.review;
     this.createdAt = props.createdAt;
     this.updatedAt = props.updatedAt
  }
}