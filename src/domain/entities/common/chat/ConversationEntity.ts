import { ConversationType } from "../../../../infrastructure/db/models/common/chat/ConversationModel";

export class ConversationEntity {
  public id?: string;
  public eventId: string;
  public participants: string[];
  public lastMessage?: string;
  public type: ConversationType;
  public lastSenderId?: string;

  constructor(
      props: {
          type: ConversationType
          eventId: string;
          participants: string[]; 
          lastMessage?: string;
          lastSenderId?: string;
          id?: string
      }
  ){
     this.eventId = props.eventId;
     this.type = props.type;
     this.lastMessage = props.lastMessage;
     this.lastSenderId = props.lastSenderId;
     this.participants = props.participants;
     this.id = props.id
  }

}