import { IBookingRepository } from "../../../../domain/repositories/user/IBookingRepository";
import { ResponseMessages } from "../../../../infrastructure/constants/responseMessages";
import { BookingFilterDTO } from "../../../DTOs/organizer/bookings/bookingFilterDTO";
import { BookingResponseDTO } from "../../../DTOs/user/booking/BookingResponseDTO";
import { IBookingMapper } from "../../../interface/mapper/user/IBookingMapper";
import { IGetAllBookingsByEventIdUseCase } from "../../../interface/useCases/organizer/booking/IGetAllBookingsByEventIdUseCase";

export class GetAllBookingsByEventIdUseACase implements IGetAllBookingsByEventIdUseCase {
  constructor(
     private _bookingRepo : IBookingRepository,
     private _bookingMapper : IBookingMapper
  ){}
async execute( filter: BookingFilterDTO): Promise<{ mappedBookings: BookingResponseDTO[]; totalPages: number; }> {
    const{bookings,totalPages} = await this._bookingRepo.findAllWithFilter(filter);
     if(!bookings)  throw new Error(ResponseMessages.BOOKING_DETAILS.BOOKING_DETAILS_FAILURE);
    
     const mappedBookings = this._bookingMapper.toResponseDTOList(bookings);
       
   return {mappedBookings, totalPages}
}
}