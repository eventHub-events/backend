import { MessageResponseDTO } from '../../../../DTOs/common/chat/MessageResponseDTO';
import { SendMessageRequestDTO } from '../../../../DTOs/common/chat/SentMessageRequestDTO';

export interface ISendMessageUseCase {
  execute(dto: SendMessageRequestDTO): Promise<MessageResponseDTO>;
}
