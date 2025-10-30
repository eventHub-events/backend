import { Types } from "mongoose";
import { BookingStatus } from "../../enums/user/Booking";

export class BookingEntity {
   public readonly userId : Types.ObjectId;
   public readonly eventId : Types.ObjectId;
   public readonly tickets : {
               name:  string, quantity: number, price: number
                                        }[];
   public totalAmount : number;
   public status: BookingStatus;
   public readonly createdAt? : Date;
   public readonly eventTitle: string;
   public readonly eventDate: string;
   public readonly organizerName : string;
   public readonly eventVenue: string;
   public readonly  id?:Types.ObjectId;
   public  expiresAt: Date
  constructor(props :{
     userId : Types.ObjectId,
     eventId : Types.ObjectId,
     tickets : {
               name:  string, quantity: number, price: number
                                        }[],
     
       totalAmount : number,
       status: BookingStatus,
       createdAt? : Date ,
       eventTitle: string,
       eventDate: string,
       organizerName: string,
       eventVenue: string,
       id?: Types.ObjectId,
       expiresAt: Date
        




  }

    
  ){
       this.userId = props.userId;
       this.eventId = props.eventId;
       this.tickets= props.tickets;
       this.status= props.status ?? BookingStatus.PENDING_PAYMENT;
       this.createdAt= props.createdAt ?? new Date();
       this.eventTitle = props.eventTitle;
       this.eventVenue = props.eventVenue;
       this.organizerName = props.organizerName;
       this.eventDate = props.eventDate;
       this.totalAmount = props.totalAmount;
       this.id = props.id;
       this.expiresAt = props.expiresAt?? new Date(Date.now() + 15 * 60 * 1000);
  }

  markAsConfirmed() {
    this.status = BookingStatus.CONFIRMED;
  }
  cancelBooking() {
     this.status = BookingStatus.CANCELLED;
  }
  markAsExpired() {
     this.status = BookingStatus.EXPIRED
  }
  calculateTotalAmount(): number {
    return this.tickets.reduce((sum, t) => sum+t.price*t.quantity, 0);
  }
}