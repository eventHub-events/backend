
import { IEventModerationRepository } from "../../../domain/repositories/admin/IEventModerationRepository";
import { EventModerationModel, IEventModeration } from "../../db/models/organizer/events/EventModerationModel";
import { BaseRepository } from "../BaseRepository";
import { IEventModerationEntityFactory } from "../../../application/interface/factories/admin/IEventModerationEntityFactory";
import { EventModerationDbModel } from "../../../domain/types/AdminDbTypes";
import { EventModerationEntity } from "../../../domain/entities/admin/EventModerationEntity";

export class EventModerationRepository extends BaseRepository<IEventModeration> implements IEventModerationRepository {
  constructor(
       private _eventModerationEntityFactory : IEventModerationEntityFactory<EventModerationDbModel, EventModerationEntity>
  ){
    super(EventModerationModel)
  }
  async createEventModeration(data: EventModerationEntity): Promise<EventModerationEntity> {
     
        const createdDoc = await super.create(data) as EventModerationDbModel ;
        if(!createdDoc) throw new  Error("Event moderation details not created");
    return this._eventModerationEntityFactory.toDomain(createdDoc);
      
  }
  async updateEventModeration(moderationId: string, data: EventModerationEntity): Promise<EventModerationEntity> {
       
     const updatedDoc =  await super.update(moderationId, data) as EventModerationDbModel;
      
      if(! updatedDoc) throw new  Error("Event moderation details not created");
    return this._eventModerationEntityFactory.toDomain(updatedDoc);
      
  }
}