import { OrganizerStripeAccountEntity } from "../../entities/organizer/OrganizerStripeAccountEntity";

export interface IOrganizerStripeAccountRepository {
  createStripeAccount(stripeAccountEntity : OrganizerStripeAccountEntity ):  Promise<OrganizerStripeAccountEntity>;
  getStripeAccounts(organizerId : string): Promise<OrganizerStripeAccountEntity[]>;

  updateStripeAccount(organizerId: string, stripeAccountEntity : OrganizerStripeAccountEntity) : Promise<OrganizerStripeAccountEntity>;
  getStripeAccountByStripeId( stripeAccountId : string) : Promise<OrganizerStripeAccountEntity>
}