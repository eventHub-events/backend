import { MessageTypes, SenderTypes } from "../../../../infrastructure/db/models/common/chat/MessageModel";

export interface MessageResponseDTO {
   id?: string;
   senderId: string;
   senderType: SenderTypes;
   message: string;
   messageType?: MessageTypes;
   conversationId?: string;
}
