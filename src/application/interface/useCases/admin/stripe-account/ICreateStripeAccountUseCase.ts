export interface ICreateStripeAccountUseCase {
  execute(organizerId: string, email: string, label: string): Promise<string>;
}
