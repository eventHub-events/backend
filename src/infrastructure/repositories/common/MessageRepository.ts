import { IMessageEntityFactory } from "../../../application/interface/factories/common/IMessageEntityFactory";
import { MessageEntity } from "../../../domain/entities/common/chat/MessageEntity";
import { IMessageRepository } from "../../../domain/repositories/common/IMessageRepository";
import { MessageDbModel } from "../../../domain/types/CommonDbTypes";
import { IMessage, MessageModel } from "../../db/models/common/chat/MessageModel";
import { BaseRepository } from "../BaseRepository";

export class MessageRepository extends BaseRepository<IMessage> implements IMessageRepository {
   constructor(
          private _messageEntityFactory : IMessageEntityFactory
   ){
       super(MessageModel)
   }
   async createMessage(data: MessageEntity): Promise<MessageEntity> {

        const message = await super.create(data) as MessageDbModel;
     return  this._messageEntityFactory.toDomain(message);
   }

  async getMessagesByConversationId(conversationId: string): Promise<MessageEntity[]> {

      const messages = await this.model.find({conversationId}).sort({createdAt: 1}) as MessageDbModel[];
  return this._messageEntityFactory.toDomainList(messages);
  }
  async markMessagesAsRead(conversationId:string, receiverId: string) : Promise<void> {
       
        await super.updateMany(
          {conversationId, receiverId, isRead: false},
          {$set: {isRead: true}}
      )
  }

}