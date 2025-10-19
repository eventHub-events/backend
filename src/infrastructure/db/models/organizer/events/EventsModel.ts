import mongoose, { Document, Schema, Types } from "mongoose";
import { ITicketTier } from "../../../../../domain/valueObject/organizer/ticketTier";
import { ILocation } from "../../../../../domain/valueObject/organizer/location";
import { locationSchema } from "./LocationModel";
import { TicketTierSchema } from "./TicketTierModel";
import { EventStatus, EventType } from "../../../../../domain/enums/organizer/events";
import { IWaitingListEntry } from "../../../../../domain/valueObject/organizer/WaitingListEntry";
import { WaitingListSchema } from "../../../../../domain/valueObject/organizer/WaitingListModel";


export interface IEvent extends Document {
  organizerId: Types.ObjectId;
  type: EventType;
  categoryId: Types.ObjectId;
  location: ILocation;
  totalCapacity: number;
  description : string;
  title: string;
  startDate: Date;
  endDate: Date;
  images: string[];
  tickets: ITicketTier[];
  status: EventStatus;
  ticketsSold:  number;
   isDeleted :boolean;
  totalRevenue: number;
  platformCommission: number;
  organizerEarnings: number;
  featured?: boolean;
  startTime?: string;
  endTime?: string;
  approved?: boolean;
  flaggedReason: string;
  saleStartDate?: Date;
  saleEndDate?: Date;
  viewsCount?: number;
  bookmarkCount?: number;
  sharesCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
  tags?:string[];
  waitingListEnabled?: boolean;
  waitingList?: IWaitingListEntry[];
  isBlocked?: boolean;
  blockedReason?: string;
  reviews?: Types.ObjectId;
  averageRating?: number;
  reviewCount?: number;
  
}

const EventSchema = new Schema<IEvent>({
  organizerId: {
       type: Schema.Types.ObjectId,
       ref: "User",
       required: true
     },
 
  title: {
    type: String,
    required: true,
    trim: true,
   },
  type:{
     type: String,
     enum: Object.values(EventType),
     required: true,
     trim: true
   },
  categoryId: {
     type: Schema.Types.ObjectId,
     ref: "Category",
     required: true
   },
  description: {
     type: String,
   },
  location: {
     type:  locationSchema,
   },
  totalCapacity: {
      type: Number,
      required: true,
      min: 1
   },
  startDate : {
     type: Date
   },
  endDate : {
     type: Date
   },
  saleStartDate : {
      type : Date
  },
  saleEndDate : {
      type: Date
  },

  images : 
    [{type: String, required: true}],
  tickets: {
      type: [TicketTierSchema],
      required: true
   },
  status: {
     type: String,
     enum: Object.values(EventStatus),
     default: EventStatus.Draft

   },
  flaggedReason:  {
     type: String
  },
  approved : {
     type :Boolean,
     default: false
    },
  featured : {
     type: Boolean,
     default: false
    },
    startTime: {
       type: String
    },
    endTime: {
       type: String
    },
  ticketsSold: {
     type: Number,
     default: 0
   },
   totalRevenue: {
      type: Number,
      default: 0
    },
   platformCommission: {
       type: Number,
       default: 0
    },
  organizerEarnings: {
       type: Number,
       default: 0
   },
  viewsCount: {
      type: Number,
      default: 0
   },
  bookmarkCount: {
      type: Number,
      default: 0
  },
  sharesCount: {
     type: Number,
     default: 0
  },
  tags : [{
       type: String
  }],
  createdBy: {
     type: String
  },
  isDeleted: {
     type: Boolean
  },
  waitingListEnabled : {
     type: Boolean,
     default: false
  },
  isBlocked:{
     type: Boolean,
     default: false
    },
  blockedReason: {
      type: String,
       default: ""
    },
waitingList: {
   type: [WaitingListSchema],
   default:[]
},

reviews: {
   type: Schema.Types.ObjectId,
   ref: "User"
},
averageRating: {
    type: Number,
    default: 0
},
reviewCount: {
   type: Number,
   default:0
}


},{timestamps: true}
)

//  Indexing For Performance //

EventSchema.index({name: 1, organizerId: 1});
EventSchema.index({categoryId:1});
EventSchema.index({status: 1});
EventSchema.index({featured: 1});
EventSchema.index({"location.city":1, startDate: -1});
EventSchema.index({startDate:1, endDate: 1});
EventSchema.index({tags: 1});


// model Export //

export const EventModel = mongoose.model<IEvent>("Event", EventSchema);
