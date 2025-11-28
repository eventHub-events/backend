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
    if(!organizer) throw new NotFoundError("organizer  not found");

      if(organizer.stripeAccountId) throw new Error(" stripe Onboarding already completed");
     
      const accountId = await this._stripeConnectService.createConnectedAccount(email);
      if(!accountId) throw new Error("Stripe onboarding failed");

          organizer.update({stripeAccountId: accountId, stripeOnboarded:false});

          await this._userRepository.updateUser(organizerId, organizer);
         
     const url = await this._stripeConnectService.createAccountLink(accountId);
    return url
  } 
}