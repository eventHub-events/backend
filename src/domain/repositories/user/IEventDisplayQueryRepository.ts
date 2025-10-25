

export interface IEventDisplayQueryRepository {
  findTrendingEvents(): Promise<any>
}