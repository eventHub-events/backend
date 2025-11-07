import { EventsAdminViewResponseDTO } from "../../../DTOs/admin/event-view/EventsAdminViewResponseDTO";
import { IEventAdminView } from "../../../../domain/entities/admin/IEventAdminView";

export interface IEventAdminViewMapper {
  toResponseDto(data: IEventAdminView): EventsAdminViewResponseDTO;
  toResponseDtoList(data:IEventAdminView[]):EventsAdminViewResponseDTO[];
  
}