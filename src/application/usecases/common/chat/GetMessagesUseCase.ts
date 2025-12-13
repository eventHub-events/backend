import { ErrorMessages } from '../../../../constants/errorMessages';
import { NotFoundError } from '../../../../domain/errors/common';
import { IMessageRepository } from '../../../../domain/repositories/common/IMessageRepository';
import { MessageResponseDTO } from '../../../DTOs/common/chat/MessageResponseDTO';
import { IMessageMapper } from '../../../interface/mapper/common/chat/IMessageMapper';
import { IGetMessagesUseCase } from '../../../interface/useCases/common/chat/IGetMessagesUseCase';

export class GetMessagesUseCase implements IGetMessagesUseCase {
  constructor(
    private _messageRepo: IMessageRepository,
    private _messageMapper: IMessageMapper
  ) {}

  async execute(conversationId: string): Promise<MessageResponseDTO[]> {
    const messages =
      await this._messageRepo.getMessagesByConversationId(conversationId);
    if (!messages)
      throw new NotFoundError(ErrorMessages.CHAT.CHAT_MESSAGE_NOT_FOUND);

    return this._messageMapper.toResponseDTOList(messages);
  }
}
