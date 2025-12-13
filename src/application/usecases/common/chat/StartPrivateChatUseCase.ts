import { ErrorMessages } from '../../../../constants/errorMessages';
import { NotFoundError } from '../../../../domain/errors/common';
import { IConversationRepository } from '../../../../domain/repositories/common/IConversationRepository';
import { IUserRepository } from '../../../../domain/repositories/user/IUserRepository';
import { ConversationResponseDTO } from '../../../DTOs/common/chat/ConversationResponseDTO';
import { IConversationMapper } from '../../../interface/mapper/common/chat/IConversationMapper';
import { IStartPrivateChatUseCase } from '../../../interface/useCases/common/chat/IStartPrivateChatUseCase';

export class StartPrivateChatUseCase implements IStartPrivateChatUseCase {
  constructor(
    private _conversationRepo: IConversationRepository,
    private _conversationMapper: IConversationMapper,
    private _userRepo: IUserRepository
  ) {}
  async execute(
    userId: string,
    organizerId: string,
    eventId: string
  ): Promise<ConversationResponseDTO> {
    let conversation = await this._conversationRepo.findPrivateConversation(
      userId,
      organizerId,
      eventId
    );

    if (!conversation) {
      const user = await this._userRepo.findUserById(userId);
      if (!user) throw new NotFoundError(ErrorMessages.USER.NOT_FOUND);

      conversation = await this._conversationRepo.createPrivateConversation(
        userId,
        organizerId,
        eventId,
        user?.name
      );
    }

    return this._conversationMapper.toResponseDTO(conversation);
  }
}
