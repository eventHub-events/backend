import { ErrorMessages } from "../../../../constants/errorMessages";
import { NotFoundError } from "../../../../domain/errors/common";
import { IUserRepository } from "../../../../domain/repositories/user/IUserRepository";
import { ICreateStripeAccountUseCase } from "../../../interface/useCases/admin/stripe-account/ICreateStripeAccountUseCase";
import { IStripeConnectService } from "../../../service/common/IStripeConnectService";

export class CreateStripeAccountUseCase implements ICreateStripeAccountUseCase {
  constructor(
         private _userRepository : IUserRepository,
         private _stripeConnectService : IStripeConnectService
  ){}
  async execute(organizerId: string, email: string): Promise<string> {

    const organizer = await this._userRepository.findUserById(organizerId);
    if(!organizer) throw new NotFoundError(ErrorMessages.ORGANIZER.NOT_FOUND);

      if(organizer.stripeAccountId) throw new Error(ErrorMessages.STRIPE.ON_BOARDING.AL_READY_COMPLETED);
     
      const accountId = await this._stripeConnectService.createConnectedAccount(email);
      if(!accountId) throw new Error(ErrorMessages.STRIPE.ON_BOARDING.ON_ONBOARDING_FAILED);

          organizer.update({stripeAccountId: accountId, stripeOnboarded:false});

          await this._userRepository.updateUser(organizerId, organizer);
         
     const url = await this._stripeConnectService.createAccountLink(accountId);
    return url
  } 
}