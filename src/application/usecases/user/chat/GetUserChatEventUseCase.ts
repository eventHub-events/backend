import { NotFoundError } from "../../../../domain/errors/common";
import { IConversationRepository } from "../../../../domain/repositories/common/IConversationRepository";
import { IMessageRepository } from "../../../../domain/repositories/common/IMessageRepository";
import { ConversationResponseDTO } from "../../../DTOs/common/chat/ConversationResponseDTO";
import { IConversationMapper } from "../../../interface/mapper/common/chat/IConversationMapper";
import { IGetUserChatEventUseCase } from "../../../interface/useCases/organizer/chat/IGetUserEventChatUseCase";

export class GetUserChatEventUseCase implements IGetUserChatEventUseCase {
    constructor(
        private _messageRepo : IMessageRepository,
        private _conversationRepo : IConversationRepository,
        private _conversationMapper : IConversationMapper
    ){}

 async execute(userId: string, eventId: string): Promise<ConversationResponseDTO[]> {

     const privateChats = await this._conversationRepo.findUserPrivateChatsByEvent(userId, eventId);
     if(privateChats.length === 0) throw new NotFoundError("Private chats not found");
     
     const privateChatWithUnread = await Promise.all(
         privateChats.map(async (chat) => {
           const unreadCount = await this._messageRepo.countUnread(chat.id!, userId);
          
          return {
             ...this._conversationMapper.toResponseDTO(chat),
             unreadCount
          }
         })
     )
   return privateChatWithUnread
   
 }
 
}