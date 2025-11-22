import { IMessageRepository } from "../../../../domain/repositories/common/IMessageRepository";
import { IMarkMessageAsReadUseCase } from "../../../interface/useCases/common/chat/IMarkMessageAsReadUseCase";

export class MarkMessagesAsReadUseCase implements IMarkMessageAsReadUseCase {
       constructor(
            private _messageRepo : IMessageRepository
       ){}
  async execute(conversationId: string, receiverId: string): Promise<void> {
      
       await this._messageRepo.markMessagesAsRead(conversationId, receiverId);

  }
}