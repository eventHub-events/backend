import { EventsAdminViewResponseDTO } from "../../../../DTOs/admin/event-view/EventsAdminViewResponseDTO";

export interface IGetAllEventAdminUseCase {
  execute():Promise<EventsAdminViewResponseDTO[]>;
}