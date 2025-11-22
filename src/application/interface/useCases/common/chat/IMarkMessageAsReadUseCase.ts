export interface IMarkMessageAsReadUseCase {
  execute(conversationId: string, receiverId: string): Promise<void>;

}