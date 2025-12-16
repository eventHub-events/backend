export class OrganizerStripeAccountEntity {
  public  organizerId : string;
  public  stripeAccountId : string;
  public  label : string;
  public  isDefault : boolean;
  public  onboarded : boolean;
  public  createdAt? : Date;
  public  id?: string;

  constructor(
     props : {
      organizerId : string;
      stripeAccountId : string;
      label : string;
      isDefault : boolean;
      onboarded : boolean;
      createdAt? : Date;
      id?: string;
     }
  ){
     this.organizerId = props.organizerId;
     this.stripeAccountId = props.stripeAccountId;
     this.createdAt = props.createdAt;
     this.label = props.label;
     this.isDefault = props.isDefault;
     this.onboarded = props.onboarded;
     this.id = props.id

  }
}