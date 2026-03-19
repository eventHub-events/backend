import { BookingRequestDTO } from '../../../DTOs/user/booking/BookingRequestDTO';
import { BookingResponseDTO } from '../../../DTOs/user/booking/BookingResponseDTO';
import { IEventTicketingRepository } from '../../../../domain/repositories/organizer/IEventTicketingRepository';
import { IBookingRepository } from '../../../../domain/repositories/user/IBookingRepository';
import { IBookingMapper } from '../../../interface/mapper/user/IBookingMapper';

import { IBookTicketUseCase } from '../../../interface/useCases/user/booking/IBookTicketUseCase';
import { ErrorMessages } from '../../../../constants/errorMessages';
import { IOrganizerStripeAccountRepository } from '../../../../domain/repositories/organizer/IOrganizerStripeAccountRepository';
import { BadRequestError, NotFoundError } from '../../../../domain/errors/common';
import { IEventRepository } from '../../../../domain/repositories/organizer/IEventsRepository';
import { ENV } from '../../../../infrastructure/config/common/env';
import { EventStatus } from '../../../../domain/enums/organizer/events';

export class BookTicketUseCase implements IBookTicketUseCase {
  constructor(
    private _ticketingRepository: IEventTicketingRepository,
    private _bookingRepository: IBookingRepository,
    private _bookingMapper: IBookingMapper,
    private _stripeAccountRepo: IOrganizerStripeAccountRepository,
    private _eventRepository : IEventRepository
  ) {}

  async execute(
    eventId: string,
    dto: BookingRequestDTO
  ): Promise<BookingResponseDTO> {


     const maxLimit =Number(ENV.MAX_LIMIT_PER_USER);
      const requestedTotal = dto.tickets.reduce(
    (sum, t) => sum + t.quantity,
    0
  );
    if (requestedTotal > maxLimit) {
    throw new BadRequestError(`${ErrorMessages.BOOKING.MAX_LIMIT_ERROR} ${maxLimit} ${ErrorMessages.BOOKING.TICKETS}`);
  }
  
   const existingBookings =
    await this._bookingRepository.findAllBookingsByEventIdAndUserId(
      dto.userId,
      eventId
    );

     const alreadyBooked = existingBookings?.reduce((sum, booking) => {
    return (
      sum +
      booking.tickets.reduce((s, t) => s + t.quantity, 0)
    );
  }, 0);

  
  if (alreadyBooked ?? 0 + requestedTotal > maxLimit) {
    throw new BadRequestError(`${ErrorMessages.BOOKING.MAX_LIMIT_ERROR} ${maxLimit} ${ErrorMessages.BOOKING.TICKETS}`)
  }
    const reserved = await this._ticketingRepository.reserveMultipleSeats(
      eventId,
      dto.tickets
    );

    const event = await this._eventRepository.findEventById(eventId);

if (!event) {
  throw new NotFoundError(ErrorMessages.EVENT.NOT_FOUND);
}

const now = new Date();


if (event.endDate && new Date(event.endDate) < now) {
  throw new BadRequestError(ErrorMessages.EVENT.ALREADY_COMPLETED);
}

if (event.status === EventStatus.Completed) {
  throw new BadRequestError(ErrorMessages.EVENT.ALREADY_COMPLETED);
}


if (event.status === EventStatus.Cancelled) {
  throw new BadRequestError(ErrorMessages.EVENT.CANCELLED);
}

if (event.status === EventStatus.Blocked) {
  throw new BadRequestError(ErrorMessages.EVENT.BLOCKED);
}

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
    

    return this._bookingMapper.toResponseDTO(createdBookingEntity);
  }
}
