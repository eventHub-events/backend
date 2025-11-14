export interface ICreateTicketPaymentUseCase {
    execute(bookingId: string) : Promise< string >;
}