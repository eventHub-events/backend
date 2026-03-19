import { IEventRepository } from "../../../../domain/repositories/organizer/IEventsRepository";
import { IExpiredEventUseCase } from "../../../interface/useCases/organizer/events/IExpiredEventUseCase";


export class ExpiredEventUseCase implements IExpiredEventUseCase {
    constructor(
       private _eventRepo : IEventRepository
    ){}
  async execute(): Promise<void> {
      const now = new Date();
      console.log("Checking for expired events...");
       await this._eventRepo.updateEventStatus(now)

  }
}