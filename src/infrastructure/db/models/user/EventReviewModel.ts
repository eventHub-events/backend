import mongoose, { Document, Schema } from "mongoose";


export interface IEventReview extends Document {
  eventId :string;
  userId :string;
  rating : number;
  review : string;
  createdAt: Date;
  updatedAt: Date;
};

export const eventReviewSchema = new Schema<IEventReview>({
   eventId : {
     type :String,
     required: true
   },
   userId : {
     type :String,
     required: true
   },
   rating : {
     type: Number,
     default : 0
   },
   review : {
     type : String,
     required: true
   }

},{timestamps: true});


export const  UserReviewModel = mongoose.model<IEventReview>("UserReview", eventReviewSchema);