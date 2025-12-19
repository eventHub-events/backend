import { ErrorMessages } from '../../../../constants/errorMessages';
import { EventStatus } from '../../../../domain/enums/organizer/events';
import { BadRequestError } from '../../../../domain/errors/common';
import { IEventRepository } from '../../../../domain/repositories/organizer/IEventsRepository';
import { ResponseMessages } from '../../../../infrastructure/constants/responseMessages';
import { IHandleEventCancellationUseCase } from '../../../interface/useCases/common/event-cancel/IHandleEventCancellationUseCase';
import { ICancelEventUseCase } from '../../../interface/useCases/organizer/events/ICancelEventUseCase';

export class CancelEventUseCase implements ICancelEventUseCase {
  constructor(
    private _eventRepository: IEventRepository,
    private _handleEventCancellationRefundUseCase: IHandleEventCancellationUseCase
  ) {}

  async execute(eventId: string): Promise<string> {
    const eventEntity = await this._eventRepository.findEventById(eventId);
    if (!eventEntity) throw new Error(ErrorMessages.EVENT.NOT_FOUND);
    if (eventEntity.status === EventStatus.Cancelled)
      throw new BadRequestError(ErrorMessages.EVENT.EVENT_ALREADY_CANCELLED);

    eventEntity.cancel();

    await this._eventRepository.updateEvent(eventId, eventEntity);
    await this._handleEventCancellationRefundUseCase.execute(eventId);

    return ResponseMessages.EVENT.EVENT_CANCEL_SUCCESS;
  }
}
