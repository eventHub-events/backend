import { NotFoundError } from "../../../../domain/errors/common";
import { IUserRepository } from "../../../../domain/repositories/user/IUserRepository";
import { IVerifyStripeOnboardingStatusUseCase } from "../../../interface/useCases/organizer/stripe-account/IVerifyStripeOnboardingStatusUseCase";
import { IStripeConnectService } from "../../../service/common/IStripeConnectService";

export class VerifyStripeOnboardingStatusUseCase implements IVerifyStripeOnboardingStatusUseCase {
         constructor(
              private _userRepository: IUserRepository,
              private _stripeConnectService: IStripeConnectService
         ){}
   async execute(organizerId: string): Promise<boolean> {
     
     const organizer = await this._userRepository.findUserById(organizerId);
     if(!organizer|| !organizer?.stripeAccountId) throw new NotFoundError("Organizer not found");

     const account = await this._stripeConnectService.retrieveAccount(organizer.stripeAccountId!);
         console.log("account details",account)
       if (account.details_submitted && account.payouts_enabled) {
          organizer.update({ stripeOnboarded: true });
        await this._userRepository.updateUser(organizerId, organizer);
        
      }else{
          throw new Error("Verification failed")
      }

  return true
   }
}