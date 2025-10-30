
import { IGetAllBookingsUseCase } from "../../../interface/useCases/organizer/booking/IGetAllBooking";
import { IBookingRepository } from "../../../../domain/repositories/user/IBookingRepository";
import { IBookingMapper } from "../../../interface/mapper/user/IBookingMapper";
import { BookingResponseDTO } from "../../../../domain/DTOs/user/booking/BookingResponseDTO";
import { BookingFilterDTO } from "../../../../domain/DTOs/organizer/bookings/bookingFilterDTO";

export class GetAllBookingsUseCase implements IGetAllBookingsUseCase {

   constructor( 
        private  _bookingRepository : IBookingRepository,
        private  _bookingMapper : IBookingMapper,
   ){}
   async execute(filter: BookingFilterDTO): Promise<{ mappedBookings: BookingResponseDTO[]; totalPages: number; }> {
      
        const{bookings, total:totalPages} = await this._bookingRepository.findAllWithFilter(filter);
          if(!bookings) throw new Error("Bookings not found");

      const mappedBookings = this._bookingMapper.toResponseDTOList(bookings);
    
   return {mappedBookings, totalPages}

   }
}