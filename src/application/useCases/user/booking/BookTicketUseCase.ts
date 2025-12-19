import { BookingRequestDTO } from '../../../DTOs/user/booking/BookingRequestDTO';
import { BookingResponseDTO } from '../../../DTOs/user/booking/BookingResponseDTO';
import { IEventTicketingRepository } from '../../../../domain/repositories/organizer/IEventTicketingRepository';
import { IBookingRepository } from '../../../../domain/repositories/user/IBookingRepository';
import { IBookingMapper } from '../../../interface/mapper/user/IBookingMapper';

import { IBookTicketUseCase } from '../../../interface/useCases/user/booking/IBookTicketUseCase';
import { ErrorMessages } from '../../../../constants/errorMessages';
import { IUserRepository } from '../../../../domain/repositories/user/IUserRepository';
import { IOrganizerStripeAccountRepository } from '../../../../domain/repositories/organizer/IOrganizerStripeAccountRepository';
import { NotFoundError } from '../../../../domain/errors/common';

export class BookTicketUseCase implements IBookTicketUseCase {
  constructor(
    private _ticketingRepository: IEventTicketingRepository,
    private _bookingRepository: IBookingRepository,
    private _bookingMapper: IBookingMapper,
    private _stripeAccountRepo: IOrganizerStripeAccountRepository
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

    const organizerStripeAccount =
      await this._stripeAccountRepo.getStripeAccountById(dto.stripeAccountId!);
    if (!organizerStripeAccount)
      throw new NotFoundError(ErrorMessages.STRIPE_ACCOUNT.NOT_FOUND_ERROR);

    const organizerAccount = organizerStripeAccount.stripeAccountId;
    const bookingEntity = this._bookingMapper.toEntity({
      ...dto,
      organizerStripeId: organizerAccount,
    });
    const createdBookingEntity =
      await this._bookingRepository.createBooking(bookingEntity);
    console.log('bookkk', createdBookingEntity);

    return this._bookingMapper.toResponseDTO(createdBookingEntity);
  }
}
