import { ConversationResponseDTO } from "../../../../DTOs/common/chat/ConversationResponseDTO";

export interface IStartPrivateChatUseCase {
  execute(userId: string, organizerId: string, eventId: string): Promise< ConversationResponseDTO>;
}