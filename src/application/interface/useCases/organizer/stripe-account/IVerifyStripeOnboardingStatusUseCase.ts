export interface IVerifyStripeOnboardingStatusUseCase {
  execute(organizerId: string): Promise<boolean>;
}
