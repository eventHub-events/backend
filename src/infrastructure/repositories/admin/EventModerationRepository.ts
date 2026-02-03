import { IEventModerationRepository } from '../../../domain/repositories/admin/IEventModerationRepository';
import {
  EventModerationModel,
  IEventModeration,
} from '../../db/models/organizer/events/EventModerationModel';
import { BaseRepository } from '../BaseRepository';
import { IEventModerationEntityFactory } from '../../../application/interface/factories/admin/IEventModerationEntityFactory';
import { EventModerationDbModel } from '../../../domain/types/AdminDbTypes';
import { EventModerationEntity } from '../../../domain/entities/admin/EventModerationEntity';
import { ErrorMessages } from '../../../constants/errorMessages';

export class EventModerationRepository
  extends BaseRepository<IEventModeration>
  implements IEventModerationRepository
{
  constructor(
    private _eventModerationEntityFactory: IEventModerationEntityFactory<
      EventModerationDbModel,
      EventModerationEntity
    >
  ) {
    super(EventModerationModel);
  }
  async createEventModeration(
    data: Partial<EventModerationEntity>
  ): Promise<EventModerationEntity> {
    const createdDoc = (await super.create(data)) as EventModerationDbModel;
    
    if (!createdDoc) throw new Error(ErrorMessages.EVENT_MODERATION.EVENT_MODERATION_DETAILS_NOT_CREATED);
    return this._eventModerationEntityFactory.toDomain(createdDoc);
  }
  async updateEventModeration(
    eventId: string,
    data: EventModerationEntity
  ): Promise<EventModerationEntity> {
    const updatedDoc = (await super.findOneAndUpdate(
      { eventId },
      data
    )) as EventModerationDbModel;

    if (!updatedDoc) throw new Error(ErrorMessages.EVENT_MODERATION.EVENT_MODERATION_DETAILS_NOT_CREATED);
    return this._eventModerationEntityFactory.toDomain(updatedDoc);
  }
  async findEventModerationByEventId(
    eventId: string
  ): Promise<EventModerationEntity> {
    const doc = (await super.findOneWithPopulate(
      { eventId },
      []
    )) as EventModerationDbModel;
    if (!doc) throw new Error(ErrorMessages.EVENT_MODERATION.EVENT_MODERATION_DETAILS_NOT_FOUND);
    return this._eventModerationEntityFactory.toDomain(doc);
  }
  async findEventModerationById(
    moderationId: string
  ): Promise<EventModerationEntity> {
    const doc = (await super.findById(moderationId)) as EventModerationDbModel;
    if (!doc) throw new Error(ErrorMessages.EVENT_MODERATION.EVENT_MODERATION_DETAILS_NOT_FOUND);
    return this._eventModerationEntityFactory.toDomain(doc);
  }
}
