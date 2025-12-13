export interface IHandleEventCancellationUseCase {
  execute(eventId: string): Promise<void>;
}
