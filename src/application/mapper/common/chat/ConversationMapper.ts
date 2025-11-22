import { ConversationEntity } from "../../../../domain/entities/common/chat/ConversationEntity";
import { ConversationResponseDTO } from "../../../DTOs/common/chat/ConversationResponseDTO";
import { IConversationMapper } from "../../../interface/mapper/common/chat/IConversationMapper";

export class ConversationMapper implements IConversationMapper {
  toResponseDTO(entity: ConversationEntity): ConversationResponseDTO {
      return {

          id: entity.id,
          eventId: entity.eventId,
          participants: entity.participants,
          lastMessage: entity.lastMessage,
          type : entity.type,
          lastSenderId: entity.lastSenderId,
          userId: entity.userId,
          userName: entity.userName
          
      }
  }
  toResponseDTOList(entities: ConversationEntity[]): ConversationResponseDTO[] {
      return entities.map((e) => this.toResponseDTO(e))
  }
}