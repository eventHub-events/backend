import { ErrorMessages } from "../../../../constants/errorMessages";
import { NotFoundError } from "../../../../domain/errors/common";
import { IOrganizerStripeAccountRepository } from "../../../../domain/repositories/organizer/IOrganizerStripeAccountRepository";
import { StripeAccountResponseDTO } from "../../../DTOs/organizer/stripe-account/StripeAccountResponseDTO";
import { IOrganizerStripeAccountMapper } from "../../../interface/mapper/organizer/IOrganizerStripeAccountMapper";
import { IGetStripeAccountsUseCase } from "../../../interface/useCases/organizer/stripe-account/IGetStripeAccountsUseCase";

export class GetStripeAccountsUseCase implements IGetStripeAccountsUseCase {
   
   constructor(
        private _stripeRepo : IOrganizerStripeAccountRepository,
        private _stripeAccountMapper : IOrganizerStripeAccountMapper
   ){}
  async execute(organizerId: string): Promise<StripeAccountResponseDTO[]> {
      const stripeAccounts = await this._stripeRepo.getStripeAccounts(organizerId);
     

      if(!stripeAccounts) throw new NotFoundError(ErrorMessages.STRIPE_ACCOUNT.NOT_FOUND_ERROR);

    return  this._stripeAccountMapper.toResponseDTOList(stripeAccounts);
     
  
  }
}