import mongoose, { Schema, Types } from "mongoose";
import { EventApprovalStatus } from "../../../../../domain/enums/organizer/events";

export interface IEventModeration extends Document {
  eventId :Types.ObjectId;
  eventApprovalStatus: EventApprovalStatus;
  approved: boolean;
  approvedAt: Date;
  approvedBy?: Types.ObjectId;
  rejectionReason?: string;
  flaggedReason?: string;
  flaggedBy?: Types.ObjectId;
  flaggedAt?: Date;
  isBlocked?: boolean;
  blockedReason?: string;
  blockedAt?: Date;
  blockedBy?: Types.ObjectId;
  moderationHistory : Array<{
    action : string;
    reason?: string;
    performedBy: Types.ObjectId;
    performedAt :Date
  }>,

}

const EventModerationSchema = new Schema<IEventModeration>({
  eventId: {
     type: Schema.Types.ObjectId,
     ref: "Event",
     required: true,
     unique: true
  },
  eventApprovalStatus : {
     type: String,
     enum: Object.values(EventApprovalStatus),
     default: EventApprovalStatus.Pending
  },
  approved : {
    type: Boolean,
    default: false
  },
  approvedAt: {
     type: Date
  },
  approvedBy :{
     type: Schema.Types.ObjectId, 
     ref: "User"
  },
  rejectionReason : {
    type: String,
    default: ""
  },
  flaggedReason : {
      type :String,
      default: ""

  },
  flaggedBy: {
     type: Schema.Types. ObjectId,
      ref: "User"
  },
  flaggedAt: {
     type:Date
  },
  isBlocked: {
     type: Boolean,
     default: false
  },
  blockedAt : {
     type: Date
  },
  blockedBy : {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  moderationHistory :[{
     action: {type:  String, required: true},
     reason: {type: String},
     performedBy: {type: Schema.Types.ObjectId, ref: "User", required: true},
     performedAt: {type: Date, default: Date.now()}
  }]
},{timestamps: true});

EventModerationSchema.index({eventId: 1});
EventModerationSchema.index({EventApprovalStatus :1});
EventModerationSchema.index({isBlocked: 1});

export const EventModerationModel =  mongoose.model<IEventModeration>("EventModeration", EventModerationSchema);

