
export interface ICreateSubscriptionCheckoutUseCase {
 execute(data:{planName: string,price: number,organizerId: string,durationInDays: number,organizerName:string, organizerEmail: string, planId: string,subscriptionType: string, payoutDelayDays: number,commissionRate: number}): Promise<string>
}