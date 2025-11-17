import { MessageResponseDTO } from "../../../../DTOs/common/chat/MessageResponseDTO";

export interface IGetMessagesUseCase {
  execute(conversationId: string) : Promise<MessageResponseDTO[]>;
}