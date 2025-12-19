import { ErrorMessages } from '../../../../constants/errorMessages';
import { IConversationRepository } from '../../../../domain/repositories/common/IConversationRepository';
import { IMessageRepository } from '../../../../domain/repositories/common/IMessageRepository';
import { MessageResponseDTO } from '../../../DTOs/common/chat/MessageResponseDTO';
import { SendMessageRequestDTO } from '../../../DTOs/common/chat/SentMessageRequestDTO';
import { IMessageMapper } from '../../../interface/mapper/common/chat/IMessageMapper';
import { ISendMessageUseCase } from '../../../interface/useCases/common/chat/ISendMessageUseCase';

export class SendMessageUseCase implements ISendMessageUseCase {
  constructor(
    private _messageRepo: IMessageRepository,
    private _conversationRepo: IConversationRepository,
    private _messageMapper: IMessageMapper
  ) {}

  async execute(dto: SendMessageRequestDTO): Promise<MessageResponseDTO> {
    const msgEntity = this._messageMapper.toEntity(dto);
    const created = await this._messageRepo.createMessage(msgEntity);

    if (!created) throw new Error(ErrorMessages.CHAT.MESSAGE_NOT_SAVED);
    await this._conversationRepo.updateLastMessage(
      dto.conversationId,
      dto.message,
      dto.senderId
    );

    return this._messageMapper.toResponseDTO(created);
  }
}
