import { MessageEntity } from "../../entities/common/chat/MessageEntity";

export interface IMessageRepository {
  createMessage(data: MessageEntity): Promise<MessageEntity>;
  getMessagesByConversationId(conversationId: string): Promise<MessageEntity[]>;
  markMessagesAsRead(conversationId:string, receiverId: string) : Promise<void>;
  countUnread(conversationId: string, receiverId: string): Promise<number>;

}