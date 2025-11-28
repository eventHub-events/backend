import { Types } from "mongoose";
import { BookingStatus, PayoutStatus } from "../../enums/user/Booking";

export class BookingEntity {
   public  userId : Types.ObjectId;
   public  eventId : Types.ObjectId;
   public readonly tickets : {
               name:  string, quantity: number, price: number
                                        }[];
   public totalAmount : number;
   public status: BookingStatus;
   public  createdAt? : Date;
   public  eventTitle: string;
   public  eventDate: string;
   public  organizerName : string;
   public readonly eventVenue: string;
   public  userName: string;
   public readonly  id?:Types.ObjectId;
   public  expiresAt?: Date
   public  organizerId: Types.ObjectId;
   public eventImages?:string[];
   public payoutStatus?: PayoutStatus;
   public payoutDueDate?: Date;
   public PayoutDate?: Date;
   public paymentId?: string;
   public organizerStripeId?: string;
   public ticketUrls?: string[];
   public sessionId?: string;
   public commissionRate?: number;
   public platformFee?: number;
   public organizerAmount?: number;
   public subscriptionPlanId?: string

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
          payoutStatus? :PayoutStatus;
          payoutDueDate?: Date;
          payoutDate?: Date;
          organizerStripId?: string;
          paymentId?: string
       organizerName: string,
       ticketUrls?: string[];
       eventVenue: string,
       sessionId?: string,
       userName: string,
       commissionRate?: number;
        platformFee?: number;
       organizerAmount? : number;
       subScriptionPlanId?: string;
       eventImages?: string[]
       organizerId: Types.ObjectId,
       id?: Types.ObjectId,
       expiresAt?: Date
        




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
       this.eventImages = props.eventImages;
       this.organizerId= props.organizerId;
       this.userName = props.userName;
       this.expiresAt = props.expiresAt?? new Date(Date.now() + 15 * 60 * 1000);
       this.paymentId = props.paymentId;
       this.payoutStatus = props.payoutStatus;
       this.payoutDueDate = props.payoutDueDate;
       this.PayoutDate = props.payoutDate;
       this.organizerStripeId = props.organizerStripId;
       this.ticketUrls = props.ticketUrls,
       this.sessionId = props.sessionId,
       this.commissionRate = props.commissionRate,
       this.platformFee = props.platformFee?? 0,
       this.organizerAmount = props.organizerAmount,
       this.subscriptionPlanId = props.subScriptionPlanId
  }

  markAsConfirmed() {
    this.status = BookingStatus.CONFIRMED;
  }
  update(data: Partial<BookingEntity>){
   Object.assign(this, data);
   return this;
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
  applyCommission(rate: number) {
  this.commissionRate = rate;

  this.platformFee = Number(
    (this.totalAmount * (rate / 100)).toFixed(2)
  );

  this.organizerAmount = Number(
    (this.totalAmount - this.platformFee).toFixed(2)
  );
}

  
}