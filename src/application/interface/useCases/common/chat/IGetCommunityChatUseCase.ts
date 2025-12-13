import { ConversationResponseDTO } from '../../../../DTOs/common/chat/ConversationResponseDTO';

export interface IGetCommunityChatUseCase {
  execute(eventId: string): Promise<ConversationResponseDTO>;
}
