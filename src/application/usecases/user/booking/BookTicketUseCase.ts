import { BookingRequestDTO } from "../../../DTOs/user/booking/BookingRequestDTO";
import { BookingResponseDTO } from "../../../DTOs/user/booking/BookingResponseDTO";
import { IEventTicketingRepository } from "../../../../domain/repositories/organizer/IEventTicketingRepository";
import { IBookingRepository } from "../../../../domain/repositories/user/IBookingRepository";
import { IEventTicketing } from "../../../../infrastructure/db/models/organizer/events/EventTicketingModel";
import { IBookingMapper } from "../../../interface/mapper/user/IBookingMapper";
import { IEventMapper } from "../../../interface/useCases/organizer/events/IEventMapper";
import { IBookTicketUseCase } from "../../../interface/useCases/user/booking/IBookTicketUseCase";

export  class BookTicketUseCase implements IBookTicketUseCase {
  constructor(
          private _ticketingRepository : IEventTicketingRepository,
          private _bookingRepository : IBookingRepository,
          private _bookingMapper : IBookingMapper

  ){}

  async execute(eventId: string, dto: BookingRequestDTO): Promise<BookingResponseDTO> {

      const reserved =  await this._ticketingRepository.reserveMultipleSeats(eventId, dto.tickets);
      console.log("res", reserved)
      if(!reserved) throw new Error("Booking failed - seats not available");

         const bookingEntity = this._bookingMapper.toEntity(dto);
      const  createdBookingEntity = await this._bookingRepository.createBooking(bookingEntity);
   return this._bookingMapper.toResponseDTO(createdBookingEntity)

  }
}