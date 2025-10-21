import { IEventTicketingRepository } from "../../../domain/repositories/organizer/IEventTicketingRepository";
import { EventTicketingModel, IEventTicketing } from "../../db/models/organizer/events/EventTicketingModel";
import { BaseRepository } from "../BaseRepository";

export class EventTicketingRepository extends BaseRepository<IEventTicketing> implements IEventTicketingRepository {
  constructor(
       private _eventTicketingFactory : IEventTicketingFactory
  ){
    super(EventTicketingModel)
  }

}