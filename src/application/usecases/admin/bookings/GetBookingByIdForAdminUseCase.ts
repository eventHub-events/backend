import { NotFoundError } from "../../../../domain/errors/common";
import { IBookingRepository } from "../../../../domain/repositories/user/IBookingRepository";
import { UserBookingListResponseDTO } from "../../../DTOs/user/booking/UserBookingListResponseDTO";
import { IBookingMapper } from "../../../interface/mapper/user/IBookingMapper";
import { IGetUserBookingByIdForAdminUseCase } from "../../../interface/useCases/admin/bookings/IGetBookingByIdForAdminUseCase";

export class GetUserBookingByIdForAdminUseCase implements IGetUserBookingByIdForAdminUseCase {
    constructor(
           private _bookingRepo : IBookingRepository,
           private _bookingMapper : IBookingMapper
        ){}
  async execute(bookingId: string): Promise<UserBookingListResponseDTO> {
       const booking = await this._bookingRepo.findBookingById(bookingId);
            if(!booking) throw new NotFoundError("Booking Not found");
      
            return this._bookingMapper.toUserResponseDTO(booking);
  }
}