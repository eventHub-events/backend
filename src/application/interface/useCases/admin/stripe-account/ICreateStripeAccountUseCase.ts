export interface ICreateStripeAccountUseCase {
  execute(organizerId: string, email: string): Promise<string>;
}
