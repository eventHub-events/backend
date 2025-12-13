export interface IDeleteEventUseCase {
  execute(eventId: string): Promise<string>;
}
