import { Types } from "mongoose";
import { SubscriptionStatus } from "../../enums/organizer/subscription";
import { multipleOf } from "zod";

export class OrganizerSubscriptionEntity {
   public organizerId : Types.ObjectId;
   public organizerName : string;
   public organizerEmail : string;
   public planId: Types.ObjectId;
   public planName: string;
   public startDate?: Date;
   public endDate?: Date;
   public price?: number;
   public status?: SubscriptionStatus
   public paymentId?: string;
   public id?: string;
   public payoutDelayDays?: number;

   constructor(props: {
      organizerId: Types.ObjectId,
      organizerName: string,
      organizerEmail : string,
      planId: Types.ObjectId,
      planName: string,
      startDate?: Date,
      endDate?: Date,
      status?:SubscriptionStatus,
      paymentId?: string,
      price?:number,
      payoutDelayDays?: number;
      id?: string


   }) {
       this.organizerId = props.organizerId;
       this.organizerName = props.organizerName;
       this.organizerEmail = props.organizerEmail;
       this.planId = props.planId;
       this.planName = props.planName;
       this.startDate = props.startDate;
       this.endDate = props.endDate;
       this.status = props.status;
       this.paymentId = props.paymentId;
       this.id = props.id;
       this.price = props.price;
       this.payoutDelayDays = props.payoutDelayDays;

   }
  isActive(): boolean {
     return this.status === SubscriptionStatus.Active && this.endDate! > new Date;
  }

  markAsActive(paymentId: string){
     this.status = SubscriptionStatus.Active;
     this.paymentId = paymentId;
  }
  markAsExpired() {
      this.status = SubscriptionStatus.Expired
  }

} 