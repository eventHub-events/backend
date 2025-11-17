import { IMessageEntityFactory } from "../../../application/interface/factories/common/IMessageEntityFactory";
import { MessageEntity } from "../../../domain/entities/common/chat/MessageEntity";
import { MessageDbModel } from "../../../domain/types/CommonDbTypes";

export class MessageEntityFactory implements IMessageEntityFactory {
  toDomain(dbModel: MessageDbModel): MessageEntity {
      return new MessageEntity({
          id: dbModel._id.toString(),
          conversationId: dbModel.conversationId,
          senderId : dbModel.senderId,
          senderType : dbModel.senderType,
          message : dbModel.message,
          messageType :dbModel.messageType
      })
  }
  toDomainList(dbModel: MessageDbModel[]): MessageEntity[] {
      return dbModel.map((model) => this.toDomain(model));
  }
}