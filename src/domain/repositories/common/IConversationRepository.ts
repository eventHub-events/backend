import { ConversationEntity } from "../../entities/common/chat/ConversationEntity";

export interface IConversationRepository {
  findPrivateConversation(userId:string, organizerId:string, eventId: string): Promise<ConversationEntity>;
  createPrivateConversation(userId :string, organizerId: string, eventId: string): Promise<ConversationEntity>;
  createCommunityConversation(eventId: string): Promise<ConversationEntity>;
  findOrCreateCommunityConversation(eventId: string): Promise<ConversationEntity>
  getById(conversationId : string): Promise<ConversationEntity>;
  updateLastMessage(conversationId: string, message: string, senderId: string): Promise<void>;

}