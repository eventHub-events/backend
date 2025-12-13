import { EventModerationEntity } from '../../entities/admin/EventModerationEntity';

export interface IEventModerationRepository {
  createEventModeration(
    data: Partial<EventModerationEntity>
  ): Promise<EventModerationEntity>;
  updateEventModeration(
    eventId: string,
    data: EventModerationEntity
  ): Promise<EventModerationEntity>;
  findEventModerationByEventId(eventId: string): Promise<EventModerationEntity>;
  findEventModerationById(moderationId: string): Promise<EventModerationEntity>;
}
