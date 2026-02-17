export interface IVerifyStripeOnboardingStatusUseCase {
  execute(userId: string,stripeAccountId: string): Promise<boolean>;
}
