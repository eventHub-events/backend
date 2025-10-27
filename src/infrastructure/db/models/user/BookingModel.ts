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
   organizerName: string;
   eventVenue: string;

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
   organizerName : {
     type: String
   },
   totalAmount : {
     type : Number
   },
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
   }
   
},{timestamps : true})

export  const  BookingModel =  mongoose.model<IBooking>("Booking", bookingSchema);