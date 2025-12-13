import { MessageEntity } from '../../../../domain/entities/common/chat/MessageEntity';
import { MessageDbModel } from '../../../../domain/types/CommonDbTypes';
import { IDomainFactory } from '../IDomainFactory';

export interface IMessageEntityFactory extends IDomainFactory<
  MessageDbModel,
  MessageEntity
> {}
