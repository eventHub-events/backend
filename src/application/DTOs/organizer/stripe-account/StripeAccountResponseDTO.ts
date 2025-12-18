export interface StripeAccountResponseDTO {
  organizerId: string;
  stripeAccountId: string;
  label: string;
  createdAt?: Date;

  onboarded?: boolean;
  id?: string;
  isDefault?: boolean;
  isActive?: boolean;
}
