import mongoose, { Document, Schema, Types } from "mongoose";
import { BookingStatus } from "../../../../domain/enums/user/Booking";

export interface IBooking extends Document {
   userId: Types.ObjectId;
   eventId: Types.ObjectId;
   tickets: {
          name:  string,
          quantity: number,
          price: number
        }[];
   totalAmount: number,
   status: BookingStatus,
   eventTitle: string;
   eventDate: string;
   userName: string;
   organizerName: string;
   eventVenue: string;
   expiresAt : Date;
   eventImages? : string[];
   organizerId: Types.ObjectId;

}

const bookingSchema = new Schema<IBooking>({
   userId : {
     type: Schema.Types.ObjectId,
     ref: "User",
     required: true
      },
   eventId : {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true
     },
   eventTitle: {
     type: String,
   },
    userName: {
       type:String
    },
   organizerName : {
     type: String
   },
   organizerId: {
     type: Schema.Types.ObjectId,
     ref: "User"
   },
   totalAmount : {
     type : Number
   },
    eventImages : 
    [{type: String, required: true}],
   eventDate : {
     type: String
   },
   eventVenue : {
     type: String
    },
    tickets : [{
        name: {
          type: String
        },
       quantity: {
          type: Number
       },
       price :{
         type :Number
       }
    }],
   status : {
     type : String,
      enum:Object.values(BookingStatus),
     default : BookingStatus.PENDING_PAYMENT
   },
   expiresAt : {
    type: Date,
    default: new Date(Date.now() + 15 * 60 * 1000)
   }
   
},{timestamps : true})

export  const  BookingModel =  mongoose.model<IBooking>("Booking", bookingSchema);