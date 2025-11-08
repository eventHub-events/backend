import { BookingResponseDTOForAdmin } from "../../../DTOs/admin/bookings/BookingResponseDTOForAdmin";
import { BookingFilterForAdminDTO } from "../../../DTOs/admin/bookings/BookingsFilterForAdminDTO";

import { IBookingRepository } from "../../../../domain/repositories/user/IBookingRepository";
import { ResponseMessages } from "../../../../infrastructure/constants/responseMessages";
import { IBookingMapperAdmin } from "../../../interface/mapper/admin/IBookingMapperAdmin";
import { IGetAllBookingsForAdminUseCase } from "../../../interface/useCases/admin/bookings/IGetAllBookingsForAdminUseCase";

export class GetAllBookingsForAdminUseCase implements IGetAllBookingsForAdminUseCase {
  constructor(
        private  _bookingRepository : IBookingRepository,
        private  _BookingMapperAdmin: IBookingMapperAdmin
  ) {}
  async execute(filter: BookingFilterForAdminDTO): Promise<{mappedBookings:BookingResponseDTOForAdmin[], totalPages:number }> {
       
      const {bookings, totalPages}  = await this._bookingRepository.findAllWithFilter(filter);
      if(!bookings) throw new  Error(ResponseMessages.BOOKING_DETAILS.BOOKING_DETAILS_FAILURE);

       const mappedBookings = this._BookingMapperAdmin.toResponseDTOList(bookings);
      
       return {mappedBookings, totalPages}
      
  }
}