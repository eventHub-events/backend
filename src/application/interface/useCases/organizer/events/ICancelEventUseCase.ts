export interface ICancelEventUseCase {
  execute(eventId: string): Promise<string>;
}
