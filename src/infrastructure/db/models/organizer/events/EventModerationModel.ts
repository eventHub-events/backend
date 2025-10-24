import mongoose, { Document, Schema, Types } from "mongoose";
import { EventApprovalStatus } from "../../../../../domain/enums/organizer/events";

export interface IEventModeration extends Document {
  eventId :Types.ObjectId;
  eventApprovalStatus: EventApprovalStatus;
  approved: boolean;
  approvedAt?: Date;
  approvedBy?: string;
  rejectionReason?: string;
  flaggedReason?: string;
  flaggedBy?: string;
  flaggedAt?: Date;
  isBlocked?: boolean;
  blockedReason?: string;
  blockedAt?: Date;
  blockedBy?: string;
  moderationHistory : Array<{
    action : string;
    reason?: string;
    performedBy?: string;
    performedAt? :Date
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
     type: String, 
     required: false,      
    default: ""
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
       type: String, 
     required: false,      
    default: ""
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
      type: String, 
     required: false,      
    default: ""
  },
  moderationHistory :[{
     action: {type:  String, required: true},
     reason: {type: String},
     performedBy: {  type: String, 
     required: false,      
    default: ""
     },
     performedAt: {type: Date, default: Date.now()}
  }]
},{timestamps: true});

EventModerationSchema.index({eventId: 1});
EventModerationSchema.index({EventApprovalStatus :1});
EventModerationSchema.index({isBlocked: 1});

export const EventModerationModel =  mongoose.model<IEventModeration>("EventModeration", EventModerationSchema);

