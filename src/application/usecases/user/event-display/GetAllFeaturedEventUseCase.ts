import { EventFilterDTO } from "../../../../domain/DTOs/user/event-display/EventFilterDTO";
import { EventDisplayEntity } from "../../../../domain/entities/user/EventDisplayEntity";
import { IEventDisplayQueryRepository } from "../../../../domain/repositories/user/IEventDisplayQueryRepository";
import { IGetAllFeaturedEventUseCase } from "../../../interface/useCases/user/event-display/IGetAllFeaturedEventUseCase";

export class GetAllFeaturedEventUseCase implements IGetAllFeaturedEventUseCase {
  constructor(
       private  readonly _eventDisplayQueryRepository : IEventDisplayQueryRepository
  ){}

 async execute(filters: EventFilterDTO): Promise<{ data: EventDisplayEntity[];  currentPage: number; totalPages: number; }> {

     const {data, totalPages} = await this._eventDisplayQueryRepository.findFeaturedEvents(filters);
     const page = filters.page ?? 1;
     const limit = filters.limit ?? 10;
  

     return {
       data,
       currentPage: page,
       totalPages
     }

 }

}