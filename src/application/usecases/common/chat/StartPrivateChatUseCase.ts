import { IConversationRepository } from "../../../../domain/repositories/common/IConversationRepository";
import { ConversationResponseDTO } from "../../../DTOs/common/chat/ConversationResponseDTO";
import { IConversationMapper } from "../../../interface/mapper/common/chat/IConversationMapper";
import { IStartPrivateChatUseCase } from "../../../interface/useCases/common/chat/IStartPrivateChatUseCase";

export class StartPrivateChatUseCase implements IStartPrivateChatUseCase {
   constructor(
         private _conversationRepo : IConversationRepository,
         private _conversationMapper : IConversationMapper
   ){}
  async execute(userId: string, organizerId: string, eventId: string): Promise< ConversationResponseDTO > {
       
    let conversation = await this._conversationRepo.findPrivateConversation(userId, organizerId, eventId);

      if(!conversation) {
          conversation = await this._conversationRepo.createPrivateConversation(userId, organizerId, eventId);
      }

     return this._conversationMapper.toResponseDTO(conversation);
  }
}