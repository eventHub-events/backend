import { ICreateSubscriptionCheckoutUseCase } from "../../../interface/useCases/organizer/subscription/ICreateSubscriptionCheckoutUseCase";
import { IStripePaymentService } from "../../../service/common/IStripePaymentService";

export class CreateSubscriptionCheckoutUseCase implements ICreateSubscriptionCheckoutUseCase {

     constructor( private  _stripePaymentService : IStripePaymentService){}
 async  execute(data:{planName: string,price: number,organizerId: string,durationInDays: number,organizerName:string, organizerEmail: string, planId: string}): Promise<string> {
      
      const checkoutUrl = await this._stripePaymentService.createSubscriptionCheckout(data);

    return checkoutUrl

  }
}