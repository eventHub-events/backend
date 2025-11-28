import Stripe from "stripe";

export interface IStripeConnectService {
   createConnectedAccount(email: string): Promise<string>;
   createAccountLink(accountId: string): Promise<string>;
   retrieveAccount(accountId: string) : Promise<Stripe.Account>;
}