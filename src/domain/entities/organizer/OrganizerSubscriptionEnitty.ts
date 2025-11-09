import { SubscriptionStatus } from "../../enums/organizer/subscription";

export class OrganizerSubscriptionEntity {
   public organizerId : string;
   public organizerName : string;
   public organizerEmail : string;
   public planId: string;
   public planName: string;
   public startDate: Date;
   public endDate: Date;
   public status?: SubscriptionStatus
   public paymentId?: string;
   public id?: string

   constructor(props: {
      organizerId: string,
      organizerName: string,
      organizerEmail : string,
      planId: string,
      planName: string,
      startDate: Date,
      endDate: Date,
      status?:SubscriptionStatus,
      paymentId?: string,
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
       this.id = props.id

   }
  isActive(): boolean {
     return this.status === SubscriptionStatus.Active && this.endDate > new Date;
  }

  markAsActive(paymentId: string){
     this.status = SubscriptionStatus.Active;
     this.paymentId = paymentId;
  }
  markAsExpired() {
      this.status = SubscriptionStatus.Expired
  }

} 