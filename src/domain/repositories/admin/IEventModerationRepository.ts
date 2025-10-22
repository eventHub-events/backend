import { EventModerationEntity } from "../../entities/admin/EventModerationEntity";

export interface IEventModerationRepository {
   createEventModeration(data: EventModerationEntity): Promise<EventModerationEntity> 
  updateEventModeration(moderationId: string, data: EventModerationEntity): Promise<EventModerationEntity> ;

}