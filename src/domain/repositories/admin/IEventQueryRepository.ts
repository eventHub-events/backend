export interface IEventQueryRepository {
  findAllEventsForAdmin(): Promise<any[]>;
  
}