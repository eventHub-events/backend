import { MessageTypes, SenderTypes } from "../../../../infrastructure/db/models/common/chat/MessageModel";

export class MessageEntity {
  public conversationId: string;
  public senderId :string;
  public senderType : SenderTypes;
  public message : string;
  public messageType : MessageTypes;
  public id?: string

  constructor(
    props: {
       conversationId: string;
       senderId: string;
       senderType: SenderTypes;
       message: string;
       messageType: MessageTypes;
       id?: string
    }
  ){
      this.conversationId = props.conversationId;
      this.id = props.id;
      this.message = props.message;
      this.senderId = props.senderId;
      this.senderType = props.senderType;
      this.messageType = props.messageType
  }
}