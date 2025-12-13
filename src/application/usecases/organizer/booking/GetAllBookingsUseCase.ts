import { IGetAllBookingsUseCase } from '../../../interface/useCases/organizer/booking/IGetAllBooking';
import { IBookingRepository } from '../../../../domain/repositories/user/IBookingRepository';
import { IBookingMapper } from '../../../interface/mapper/user/IBookingMapper';
import { BookingResponseDTO } from '../../../DTOs/user/booking/BookingResponseDTO';
import { BookingFilterDTO } from '../../../DTOs/organizer/bookings/bookingFilterDTO';
import { ResponseMessages } from '../../../../infrastructure/constants/responseMessages';

export class GetAllBookingsUseCase implements IGetAllBookingsUseCase {
  constructor(
    private _bookingRepository: IBookingRepository,
    private _bookingMapper: IBookingMapper
  ) {}
  async execute(
    filter: BookingFilterDTO
  ): Promise<{ mappedBookings: BookingResponseDTO[]; totalPages: number }> {
    const { bookings, totalPages } =
      await this._bookingRepository.findAllWithFilter(filter);
    if (!bookings)
      throw new Error(ResponseMessages.BOOKING_DETAILS.BOOKING_DETAILS_FAILURE);

    const mappedBookings = this._bookingMapper.toResponseDTOList(bookings);

    return { mappedBookings, totalPages };
  }
}
