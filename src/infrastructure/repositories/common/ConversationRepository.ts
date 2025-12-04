import { Types } from "mongoose";
import { IConversationEntityFactory } from "../../../application/interface/factories/common/IConversationEntityFactory";
import { ErrorMessages } from "../../../constants/errorMessages";
import { ConversationEntity } from "../../../domain/entities/common/chat/ConversationEntity";
import { NotFoundError } from "../../../domain/errors/common";
import { IConversationRepository } from "../../../domain/repositories/common/IConversationRepository";
import { ConversationDbModel } from "../../../domain/types/CommonDbTypes";
import { ConversationModel, ConversationType, IConversation } from "../../db/models/common/chat/ConversationModel";
import { BaseRepository } from "../BaseRepository";

export class ConversationRePository extends BaseRepository<IConversation> implements IConversationRepository {
  
   constructor(
      private  _conversationEntityFactory : IConversationEntityFactory,
      
   ){
      super(ConversationModel)
   }

async findPrivateConversation(userId: string, organizerId: string, eventId: string): Promise<ConversationEntity|null> {
     const conversation = await ConversationModel.findOne({
       type: ConversationType.PRIVATE,
       eventId,
       participants:{$all: [userId, organizerId]}
     }) as ConversationDbModel|  null;
      if (!conversation) return null;
    return this._conversationEntityFactory.toDomain(conversation);
}

async findPrivateChatsByEvent(eventId: string): Promise<ConversationEntity[]> {
   
      const filter = {
          eventId,
          type: ConversationType.PRIVATE
      }
      const conversations = await super.findAll(filter) as ConversationDbModel[];
      if(!conversations) throw new NotFoundError(ErrorMessages.CHAT.CONVERSATION_NOT_FOUND);
  return this._conversationEntityFactory.toDomainList(conversations);

}

async findUserPrivateChatsByEvent (userId: string,  eventId: string): Promise<ConversationEntity[]> {
   const filter = {
     type: ConversationType.PRIVATE,
     eventId,
     participants : userId
   }
   const conversations  = await super.findAll(filter) as ConversationDbModel[];
 return this._conversationEntityFactory.toDomainList(conversations);
}

async createPrivateConversation(userId: string, organizerId: string, eventId: string, userName: string): Promise<ConversationEntity> {
     const created = await ConversationModel.create({
         type: ConversationType.PRIVATE,
         userId,
          userName,
         eventId,
         participants:[userId,organizerId],
     }) as ConversationDbModel;

   return this._conversationEntityFactory.toDomain(created);
}

async createCommunityConversation(eventId: string): Promise<ConversationEntity> {
    const created = await ConversationModel.create({
          type : ConversationType.COMMUNITY,
          eventId,
          participants:[]
    }) as ConversationDbModel;

   return this._conversationEntityFactory.toDomain(created);
}

async findOrCreateCommunityConversation(eventId: string): Promise<ConversationEntity> {

      let conversation = await super.findOne({type:ConversationType.COMMUNITY, eventId}) as ConversationDbModel;
      if(!conversation){
          conversation = await super.create({
               type: ConversationType.COMMUNITY,
               eventId,
               participants:[]
          }) as ConversationDbModel;
      }
    return this._conversationEntityFactory.toDomain(conversation);
}

async getById(conversationId: string): Promise<ConversationEntity> {

     const conversation = await super.findById(conversationId) as ConversationDbModel;
  return this._conversationEntityFactory.toDomain(conversation);
}

async updateLastMessage(conversationId: string, message: string, senderId: string): Promise<void> {
         const filter ={
             lastMessage : message,
             lastSenderId : senderId,
             updatedAt :new Date()
         }
       const updated = await super.update(conversationId, filter) as ConversationDbModel;
        if(!updated) throw new NotFoundError(ErrorMessages.CHAT.CONVERSATION_NOT_FOUND_FOR_UPDATE);
}
async isParticipant(conversationId: string, userId :string) : Promise<boolean> {
   const conversation =  await super.findOne({
      _id : new Types.ObjectId(conversationId),
      participants : userId
   });
   console.log("conversa", conversationId)
   console.log("conver",  userId)
   return !!conversation
}
}