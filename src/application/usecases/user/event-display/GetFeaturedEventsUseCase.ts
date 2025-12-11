
import { TrendingEventDisplayResponseDTO } from "../../../DTOs/user/event-display/TrendingEventDisplayResponseDTO";
import { IEventDisplayQueryRepository } from "../../../../domain/repositories/user/IEventDisplayQueryRepository";
import { IEventDisplayMapper } from "../../../interface/mapper/user/IEventDisplayMapper";
import { IGetFeaturedEventUseCase } from "../../../interface/useCases/user/event-display/IGetFeaturedEventsUseCase";
import { ErrorMessages } from "../../../../constants/errorMessages";

export class GetFeaturedEventUseCase implements IGetFeaturedEventUseCase  {

  constructor(
        private _eventDisplayQueryRepository : IEventDisplayQueryRepository,
        private _eventDisplayMapper: IEventDisplayMapper
  ){}
  async execute(): Promise<TrendingEventDisplayResponseDTO[]> {
      const  {data} = await this._eventDisplayQueryRepository.findFeaturedEvents({});
      if(!data) throw new Error(ErrorMessages.EVENT.FEATURED_EVENT_NOT_FOUND);

    return this._eventDisplayMapper.toResponseDTOList(data);
  }
}