import mongoose, { Schema, Types } from "mongoose";
import { ITicketTier } from "../../../../../domain/valueObject/organizer/ticketTier";
import { EventStatus } from "../../../../../domain/enums/organizer/events";
import { IWaitingListEntry } from "../../../../../domain/valueObject/organizer/WaitingListEntry";
import { TicketTierSchema } from "./TicketTierModel";
import { WaitingListSchema } from "../../../../../domain/valueObject/organizer/WaitingListModel";

export interface IEventTicketing extends Document {
  eventId: Types.ObjectId;
  tickets: ITicketTier[];
  status: EventStatus;
  saleStartDate:  Date;
  saleEndDate: Date;
  ticketsSold: number;
  totalRevenue: number;
  platformCommission: number;
  organizerEarnings: number;
  ticketRevenue?: {[tierName: string]:number};
  waitingListEnabled: boolean;
  waitingList :IWaitingListEntry[];

}

const EventTicketingSchema = new Schema<IEventTicketing>({
   eventId : {
     type: Schema.Types.ObjectId,
     ref: "Event",
     required: true
     
   },
   tickets : {
    type:[TicketTierSchema],
     required: true
   },
   status: {
     type: String,
     enum: Object.values(EventStatus),
     default:EventStatus.Draft
   },
   saleStartDate :{
     type: Date
   },
   saleEndDate : {
     type: Date
   },
   ticketsSold : {
     type: Number,
     default :0
   },
   totalRevenue :{
     type: Number,
     default: 0
   },
   platformCommission : {
     type: Number,
     default: 0
   },
   organizerEarnings: {
     type: Number,
     default : 0
   },
   ticketRevenue :{
     type: Map,
     of: Number,
     default: {}
   },
   waitingListEnabled: {
     type: Boolean,
     default: false
   },
   waitingList: {
      type: [WaitingListSchema],
      default:[]
   }
})

EventTicketingSchema.index({eventId: 1});
EventTicketingSchema.index({status: 1});

export const EventTicketingModel  = mongoose.model<IEventTicketing>("EventTicketing",EventTicketingSchema);