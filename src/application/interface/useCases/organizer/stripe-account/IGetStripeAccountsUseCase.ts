import { StripeAccountResponseDTO } from "../../../../DTOs/organizer/stripe-account/StripeAccountResponseDTO";

export interface IGetStripeAccountsUseCase {
  execute(organizerId :string) : Promise<StripeAccountResponseDTO[]>;
}