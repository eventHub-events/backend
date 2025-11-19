import { MessageEntity } from "../../../../../domain/entities/common/chat/MessageEntity";
import { MessageResponseDTO } from "../../../../DTOs/common/chat/MessageResponseDTO";
import { SendMessageRequestDTO } from "../../../../DTOs/common/chat/SentMessageRequestDTO";
import { IBaseMapper } from "../../../common/IBaseMapper";

export interface IMessageMapper extends IBaseMapper<MessageEntity, SendMessageRequestDTO, MessageResponseDTO> {
   toResponseDTOList(dbModel: MessageEntity[]): MessageResponseDTO[];
}

