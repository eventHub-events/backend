
import { EventsAdminViewResponseDTO } from "../../../../domain/DTOs/admin/event-view/EventsAdminViewResponseDTO";
import { NotFoundError } from "../../../../domain/errors/common";
import { IEventQueryRepository } from "../../../../domain/repositories/admin/IEventQueryRepository";
import { IEventAdminViewMapper } from "../../../interface/mapper/admin/IEventAdminViewMapper";
import {  IGetAllEventAdminUseCase } from "../../../interface/useCases/admin/event-management/IGetAllEventUseCase";


export class GetAllEventUseCase implements IGetAllEventAdminUseCase {
  constructor(
    private readonly _eventQueryRepository: IEventQueryRepository,
    private  _eventAdminViewMapper: IEventAdminViewMapper
    
  ){}

  async execute(): Promise<EventsAdminViewResponseDTO[]>{
     const events = await this._eventQueryRepository.findAllEventsForAdmin();
     if(!events) throw new NotFoundError("Events not found");
     return this._eventAdminViewMapper.toResponseDtoList(events)
  }
}