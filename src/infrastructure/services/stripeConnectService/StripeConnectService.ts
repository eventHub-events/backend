import Stripe from 'stripe';
import { IStripeConnectService } from '../../../application/service/common/IStripeConnectService';

export class StripeConnectService implements IStripeConnectService {
  private stripe: Stripe;
  constructor(secreteKey: string) {
    this.stripe = new Stripe(secreteKey, { apiVersion: '2025-10-29.clover' });
  }
  async createConnectedAccount(email: string): Promise<string> {
    const account = await this.stripe.accounts.create({
      type: 'express',
      email,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
      business_type: 'individual',
    });
    return account.id;
  }
  async createAccountLink(accountId: string): Promise<string> {
    const link = await this.stripe.accountLinks.create({
      account: accountId,
      refresh_url: 'http://localhost:3000/organizer/onboarding/refresh',
      return_url: 'http://localhost:3000/organizer/onboarding/success',
      type: 'account_onboarding',
    });

    return link.url;
  }
  async retrieveAccount(accountId: string): Promise<Stripe.Account> {
    return await this.stripe.accounts.retrieve(accountId);
  }
}
