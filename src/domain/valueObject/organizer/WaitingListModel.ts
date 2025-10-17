import { Schema } from "mongoose";
import { IWaitingListEntry } from "./WaitingListEntry";


export const WaitingListSchema = new Schema<IWaitingListEntry>({
    userId : {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
     },
   email : {
      type: String,
      required: true,
      trim: true
    },
   addedAt: {
     type: Date,
     default: Date.now,
   },
  phone : {
      type: String
  }

},{_id: false})