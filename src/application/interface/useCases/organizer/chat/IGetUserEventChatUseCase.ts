import { ConversationResponseDTO } from '../../../../DTOs/common/chat/ConversationResponseDTO';

export interface IGetUserChatEventUseCase {
  execute(userId: string, eventId: string): Promise<ConversationResponseDTO[]>;
}
