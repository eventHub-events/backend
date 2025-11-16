import mongoose, { Document, Schema, Types } from "mongoose";
import { SubscriptionStatus } from "../../../../../domain/enums/organizer/subscription";

export interface IOrganizerSubscription extends Document  {
          organizerId: Types.ObjectId,
          organizerName: string,
          organizerEmail : string,
          planId: Types.ObjectId,
          planName: string,
          payoutDelayDays: number,
          startDate: Date,
          endDate: Date,
          price?: number,
          status?:SubscriptionStatus,
          paymentId?: string,
} 


const organizerSubscriptionSchema = new Schema<IOrganizerSubscription>({
    organizerId : {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    organizerName : {
        type: String
    },
    organizerEmail : {
        type: String
    },
    payoutDelayDays:{
        type: Number,
        default :1
    },
    price:{
          type: Number
    },
    planId : {
        type: Schema.Types.ObjectId,
        ref : "SubscriptionPlans"
    },
   planName : {
      type: String
    },
    startDate : {
       type: Date
    },
    endDate : {
       type :Date
    },
    status : {
       type: String,
       enum: Object.values(SubscriptionStatus),
       default : SubscriptionStatus.Pending

    },
    paymentId : {
       type: String
    }

},{timestamps: true})

export const OrganizerSubscriptionModel = mongoose.model<IOrganizerSubscription>("OrganizerSubscription", organizerSubscriptionSchema);