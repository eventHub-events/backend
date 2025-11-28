import { BookingFilterDTO } from "../../../DTOs/organizer/bookings/bookingFilterDTO";
import { UserBookingListResponseDTO } from "../../../DTOs/user/booking/UserBookingListResponseDTO";
import { NotFoundError } from "../../../../domain/errors/common";
import { IBookingRepository } from "../../../../domain/repositories/user/IBookingRepository";
import { IBookingMapper } from "../../../interface/mapper/user/IBookingMapper";
import { IGetUserBookingListUseCase } from "../../../interface/useCases/user/booking/IGetUserBookingListUseCase";

export class GetUserBookingListUseCase implements IGetUserBookingListUseCase {
      constructor(
                 private  _bookingRepo : IBookingRepository,
                 private _userBookingMapper: IBookingMapper
      ){}
     async  execute( filter: BookingFilterDTO): Promise<{bookingsList:UserBookingListResponseDTO[],totalPages: number}> {
          
      const { bookings, totalPages} = await this._bookingRepo.findAllWithFilter(filter);

          if(!bookings) {
            throw new NotFoundError("User Booking List not Found")
          }

           const bookingsList = this._userBookingMapper.toUserResponseDTOList(bookings);
        return { bookingsList, totalPages }
      
      }
}