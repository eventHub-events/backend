export interface StripeAccountCreationDTO {
  organizerId : string;
  stripeAccountId : string;
  label : string;
  isDefault?: boolean;
  onboarded?: boolean

}