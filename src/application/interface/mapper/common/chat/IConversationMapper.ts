import { ConversationEntity } from "../../../../../domain/entities/common/chat/ConversationEntity";
import { ConversationResponseDTO } from "../../../../DTOs/common/chat/ConversationResponseDTO";

export interface IConversationMapper {
  toResponseDTO(entity: ConversationEntity): ConversationResponseDTO;
}