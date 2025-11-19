import { NotFoundError } from "../../../../domain/errors/common";
import { IConversationRepository } from "../../../../domain/repositories/common/IConversationRepository";
import { ConversationResponseDTO } from "../../../DTOs/common/chat/ConversationResponseDTO";
import { IConversationMapper } from "../../../interface/mapper/common/chat/IConversationMapper";
import { IGetCommunityChatUseCase } from "../../../interface/useCases/common/chat/IGetCommunityChatUseCase";

export class GetCommunityChatUseCase implements IGetCommunityChatUseCase {
      
       constructor(
           private _conversationRepo : IConversationRepository,
           private _conversationMapper : IConversationMapper
       ){}
   async execute(eventId: string): Promise<ConversationResponseDTO> {

      const fetched = await this._conversationRepo.findOrCreateCommunityConversation(eventId);
      if(!fetched) throw new NotFoundError("Conversation not found");

   return this._conversationMapper.toResponseDTO(fetched);
    
  }
}