import { MessageTypes, SenderTypes } from "../../../../infrastructure/db/models/common/chat/MessageModel";

export class MessageEntity {
  public conversationId: string;
  public senderId :string;
  public senderType : SenderTypes;
  public message : string;
  public messageType : MessageTypes;
  public senderName: string;
  public createdAt?:Date;
  public id?: string
  public isRead?: boolean;
  public receiverId?:string

  constructor(
    props: {
       conversationId: string,
       senderId: string,
       senderType: SenderTypes,
       message: string,
       messageType: MessageTypes,
       senderName: string,
       createdAt?:Date
       id?: string,
       isRead?:boolean,
       receiverId?: string
    }
  ){
      this.conversationId = props.conversationId;
      this.id = props.id;
      this.message = props.message;
      this.senderId = props.senderId;
      this.senderType = props.senderType;
      this.senderName = props.senderName;
      this.messageType = props.messageType;
      this.createdAt = props.createdAt;
      this.receiverId = props.receiverId;
      this.isRead = props.isRead
  }
}