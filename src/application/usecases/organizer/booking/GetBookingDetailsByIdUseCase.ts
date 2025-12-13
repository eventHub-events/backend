import { BookingDetailsByIdResponseDTO } from '../../../DTOs/organizer/bookings/bookingDetailsByIdResponseDTO';
import { IBookingRepository } from '../../../../domain/repositories/user/IBookingRepository';
import { IBookingDetailsByIdMapper } from '../../../interface/mapper/organizer/IBookingDetailsMapper';
import { IGetBookingDetailsByIdUseCase } from '../../../interface/useCases/organizer/booking/IGetBookingDetailsByIdUseCase';

export class GetBookingDetailsByIdUseCase implements IGetBookingDetailsByIdUseCase {
  constructor(
    private _bookingRepository: IBookingRepository,
    private _bookingDetailsByIdMapper: IBookingDetailsByIdMapper
  ) {}
  async execute(bookingId: string): Promise<BookingDetailsByIdResponseDTO> {
    const bookingDetails =
      await this._bookingRepository.findBookingById(bookingId);
    return this._bookingDetailsByIdMapper.toResponseDTO(bookingDetails);
  }
}
