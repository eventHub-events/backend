
import { EventsAdminViewResponseDTO } from "../../../../DTOs/admin/event-view/EventsAdminViewResponseDTO";
import { NotFoundError } from "../../../../../domain/errors/common";
import { IEventQueryRepository } from "../../../../../domain/repositories/admin/IEventQueryRepository";
import { IEventAdminViewMapper } from "../../../../interface/mapper/admin/IEventAdminViewMapper";
import {  IGetAllEventAdminUseCase } from "../../../../interface/useCases/admin/event-management/IGetAllEventUseCase";
import { ErrorMessages } from "../../../../../constants/errorMessages";


export class GetAllEventAdminUseCase implements IGetAllEventAdminUseCase {
  constructor(
    private readonly _eventQueryRepository: IEventQueryRepository,
    private  _eventAdminViewMapper: IEventAdminViewMapper
    
  ){}

  async execute(): Promise<EventsAdminViewResponseDTO[]>{
     const events = await this._eventQueryRepository.findAllEventsForAdmin();
     if(!events) throw new NotFoundError(ErrorMessages.EVENT.NOT_FOUND);
     
   
     return this._eventAdminViewMapper.toResponseDtoList(events)
  }
}