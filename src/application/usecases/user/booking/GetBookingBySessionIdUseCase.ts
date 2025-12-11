import { ErrorMessages } from "../../../../constants/errorMessages";
import { NotFoundError } from "../../../../domain/errors/common";
import { IBookingRepository } from "../../../../domain/repositories/user/IBookingRepository";
import { UserBookingListResponseDTO } from "../../../DTOs/user/booking/UserBookingListResponseDTO";
import { IBookingMapper } from "../../../interface/mapper/user/IBookingMapper";
import { IGetBookingBySessionId } from "../../../interface/useCases/user/booking/IGetBookingBySessionIdUseCase";


export class GetUserBookingBySessionId implements IGetBookingBySessionId {
    constructor(
       private _bookingRepo : IBookingRepository,
       private _bookingMapper : IBookingMapper

    ){}
  async execute(sessionId: string): Promise<UserBookingListResponseDTO> {

     const booking = await this._bookingRepo.fetchBookingBySessionId(sessionId);

     if(!booking) throw new NotFoundError(ErrorMessages.BOOKING.BOOKING_NOT_FOUND);
     
           return this._bookingMapper.toUserResponseDTO(booking);

  }
}