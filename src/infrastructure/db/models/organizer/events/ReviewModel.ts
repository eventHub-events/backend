import mongoose, { Schema, Types } from "mongoose";



export interface IReview extends Document {
   eventId: Types.ObjectId;
   userId: Types.ObjectId;
   rating: number;
   comment: string;
   createdAt?: Date;
   updatedAt?: Date

 
}

 const ReviewSchema = new Schema<IReview>({
    eventId: {
       type: Schema.Types.ObjectId,
       ref: "Event",
       required: true
     },
    userId: {
       type: Schema.Types.ObjectId,
       ref: "User",
       required: true
     },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
     },
    comment: {
       type: String,
       required: true,
       trim: true
    }
 },{timestamps: true})

 export const ReviewModel = mongoose.model<IReview>("Review", ReviewSchema)