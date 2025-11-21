import { MessageEntity } from "../../../../domain/entities/common/chat/MessageEntity";
import { MessageTypes } from "../../../../infrastructure/db/models/common/chat/MessageModel";
import { MessageResponseDTO } from "../../../DTOs/common/chat/MessageResponseDTO";
import { SendMessageRequestDTO } from "../../../DTOs/common/chat/SentMessageRequestDTO";
import { IMessageMapper } from "../../../interface/mapper/common/chat/IMessageMapper";

export class MessageMapper implements IMessageMapper {
  toEntity(dto: SendMessageRequestDTO): MessageEntity {
       return new MessageEntity({
           conversationId : dto.conversationId,
           senderId: dto.senderId,
           senderType: dto.senderType,
           message: dto.message,
           messageType: dto.messageType ?? MessageTypes.TEXT,
           senderName: dto.senderName
       })
  }
  toResponseDTO(entity: MessageEntity): MessageResponseDTO {
      return {

             id: entity.id,
             senderId: entity.senderId,
             senderType: entity.senderType,
             message: entity.message,
             messageType: entity.messageType,
             conversationId: entity.conversationId,
             createdAt: entity.createdAt,
             senderName: entity.senderName
      }
  }
 toResponseDTOList(dbModel: MessageEntity[]): MessageResponseDTO[] {
     return dbModel.map((m) => this.toResponseDTO(m));
 }
}