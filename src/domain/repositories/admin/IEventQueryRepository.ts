import { IEventAdminView } from "../../entities/admin/IEventAdminView";

export interface IEventQueryRepository {
  findAllEventsForAdmin(): Promise<IEventAdminView[]>;
  
}