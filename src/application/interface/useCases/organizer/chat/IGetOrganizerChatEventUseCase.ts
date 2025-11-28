import { ConversationResponseDTO } from "../../../../DTOs/common/chat/ConversationResponseDTO";

export interface IGetOrganizerChatEventUseCase {
   execute(organizerId: string, eventId: string): Promise<{communityChat: ConversationResponseDTO, privateChats: ConversationResponseDTO[]}> 
}