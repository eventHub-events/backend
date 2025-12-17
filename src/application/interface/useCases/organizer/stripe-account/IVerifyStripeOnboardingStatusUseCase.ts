export interface IVerifyStripeOnboardingStatusUseCase {
  execute(stripeAccountId: string): Promise<boolean>;
}
