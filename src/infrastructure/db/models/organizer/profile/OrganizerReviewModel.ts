import mongoose, { Document, Schema } from "mongoose";


export interface IOrganizerReview extends Document {
   userId :string;
   organizerId: string;
   rating: number;
   review: string;
   createdAt?:Date;
   updatedAt?: Date;

};

export const organizerReviewSchema = new Schema<IOrganizerReview>({
    userId:{
      type: String,
      required: true

    },
    organizerId: {
       type:String,
       required: true
    },
    rating : {
      type :Number,
      default : 0
    },
    review : {
       type: String,
       required: true
    }
},{timestamps: true});

export const OrganizerReviewModel = mongoose.model<IOrganizerReview>("OrganizerReview", organizerReviewSchema);
