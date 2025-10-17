import { Schema } from "mongoose";
import { ITicketTier } from "../../../../../domain/valueObject/organizer/ticketTier";
import { TicketStatus } from "../../../../../domain/enums/organizer/events";

export const TicketTierSchema = new Schema<ITicketTier>({
    name: {
       type: String,
       required: true,
       trim: true
       },
       
    price: {
         type: Number,
         required: true,
         min: 0

        },
    totalSeats: {
        type: Number,
        required: true,
        min:  1
        },
    bookedSeats: {
        type: Number,
        default: 0,
       },
    status: {
        type: String,
        enum: Object.values(TicketStatus),
        default: TicketStatus.Active

       },
    benefits : [{
         type: String,
         trim: true
       }],
    description: {
        type: String
       },
    saleStartDate: {
        type: Date
      },
    saleEndDate: {
        type: Date
      },
    maxTicketPerUser: {
        type: Number
       },
    isRefundable: {
        type: Boolean
    }



})
