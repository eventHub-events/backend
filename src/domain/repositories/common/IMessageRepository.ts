import { MessageEntity } from "../../entities/common/chat/MessageEntity";

export interface IMessageRepository {
  createMessage(data: MessageEntity): Promise<MessageEntity>;
  getMessagesByConversationId(conversationId: string): Promise<MessageEntity[]>;
}