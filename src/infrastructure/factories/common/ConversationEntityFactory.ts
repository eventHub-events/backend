import { IConversationEntityFactory } from "../../../application/interface/factories/common/IConversationEntityFactory";
import { ConversationEntity } from "../../../domain/entities/common/chat/ConversationEntity";
import { ConversationDbModel } from "../../../domain/types/CommonDbTypes";

export class ConversationEntityFactory implements IConversationEntityFactory {
  toDomain(dbModel: ConversationDbModel): ConversationEntity {
      return new ConversationEntity({
          id: dbModel._id.toString(),
          eventId: dbModel.eventId,
          participants: dbModel.participants,
          lastMessage: dbModel.lastMessage,
          type: dbModel.type,
          lastSenderId :dbModel.lastSenderId,
          userId: dbModel.userId,
          userName : dbModel.userName
      })
  }
  toDomainList(dbModel: ConversationDbModel[]): ConversationEntity[] {
      return dbModel.map((model) => this.toDomain(model));
  }
}