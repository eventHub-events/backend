import { ConversationEntity } from '../../../../domain/entities/common/chat/ConversationEntity';
import { ConversationDbModel } from '../../../../domain/types/CommonDbTypes';
import { IDomainFactory } from '../IDomainFactory';

export interface IConversationEntityFactory extends IDomainFactory<
  ConversationDbModel,
  ConversationEntity
> {}
