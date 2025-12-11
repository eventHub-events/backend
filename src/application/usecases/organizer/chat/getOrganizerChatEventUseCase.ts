import { ErrorMessages } from "../../../../constants/errorMessages";
import { NotFoundError } from "../../../../domain/errors/common";
import { IConversationRepository } from "../../../../domain/repositories/common/IConversationRepository";
import { IMessageRepository } from "../../../../domain/repositories/common/IMessageRepository";
import { ConversationResponseDTO } from "../../../DTOs/common/chat/ConversationResponseDTO";
import { IConversationMapper } from "../../../interface/mapper/common/chat/IConversationMapper";
import { IGetOrganizerChatEventUseCase } from "../../../interface/useCases/organizer/chat/IGetOrganizerChatEventUseCase";

export class GetOrganizerChatEventUseCase implements IGetOrganizerChatEventUseCase {
    constructor(
        private _conversationRePo : IConversationRepository,
        private _conversationMapper : IConversationMapper,
        private _messageRepo : IMessageRepository
    ){}
  async execute(organizerId: string, eventId: string): Promise<{communityChat: ConversationResponseDTO, privateChats: ConversationResponseDTO[]}> {
      
    const community =  await this._conversationRePo.findOrCreateCommunityConversation(eventId);
    if(!community) throw new NotFoundError(ErrorMessages.CHAT.CHAT_MESSAGE_NOT_FOUND);
     
    const privateChats = await this._conversationRePo.findPrivateChatsByEvent(eventId);
    if(privateChats.length === 0) throw new NotFoundError(ErrorMessages.CHAT.PRIVATE_CONVERSATION_NOT_FOUND);

    const privateChatWithUnread = await Promise.all(
         privateChats.map(async(chat) =>  {
            const unreadCount = await this._messageRepo.countUnread(chat.id!,organizerId);
            return {
               ...this._conversationMapper.toResponseDTO(chat),
               unreadCount
            }
         })
    )

    return {
       communityChat: this._conversationMapper.toResponseDTO(community),
       privateChats: privateChatWithUnread
    }

  }
}