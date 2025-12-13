import { BookingRequestDTO } from '../../../DTOs/user/booking/BookingRequestDTO';
import { BookingResponseDTO } from '../../../DTOs/user/booking/BookingResponseDTO';
import { IEventTicketingRepository } from '../../../../domain/repositories/organizer/IEventTicketingRepository';
import { IBookingRepository } from '../../../../domain/repositories/user/IBookingRepository';
import { IBookingMapper } from '../../../interface/mapper/user/IBookingMapper';

import { IBookTicketUseCase } from '../../../interface/useCases/user/booking/IBookTicketUseCase';
import { ErrorMessages } from '../../../../constants/errorMessages';
import { IUserRepository } from '../../../../domain/repositories/user/IUserRepository';

export class BookTicketUseCase implements IBookTicketUseCase {
  constructor(
    private _ticketingRepository: IEventTicketingRepository,
    private _bookingRepository: IBookingRepository,
    private _bookingMapper: IBookingMapper,
    private _userRepository: IUserRepository
  ) {}

  async execute(
    eventId: string,
    dto: BookingRequestDTO
  ): Promise<BookingResponseDTO> {
    const reserved = await this._ticketingRepository.reserveMultipleSeats(
      eventId,
      dto.tickets
    );

    if (!reserved)
      throw new Error(ErrorMessages.BOOKING.BOOKING_SEAT_NOT_AVAILABLE);

    const organizer = await this._userRepository.findUserById(dto.organizerId);
    const organizerStripeId = organizer?.stripeAccountId;
    const bookingEntity = this._bookingMapper.toEntity({
      ...dto,
      organizerStripeId,
    });
    const createdBookingEntity =
      await this._bookingRepository.createBooking(bookingEntity);
    console.log('bookkk', createdBookingEntity);

    return this._bookingMapper.toResponseDTO(createdBookingEntity);
  }
}
