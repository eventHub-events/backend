
import mongoose, { Document, Schema } from "mongoose";

export enum SenderTypes {
   USER = "user",
   ORGANIZER = "organizer"
}
export enum MessageTypes {
    TEXT = "text",
    IMAGE = "image"
}
export interface IMessage extends Document {
   conversationId: string;
   senderId: string;
   senderType: SenderTypes;
   message: string;
   senderName: string;
   messageType: MessageTypes;
   createdAt?:Date;
   isRead: boolean;
   receiverId: string
}

const MessageSchema = new Schema<IMessage>(
   {
     conversationId : {
       type : String,
       required : true,
     },
    senderId: {
       type :String,
       required : true
    },
    senderType:{
      type : String,
       enum :Object.values(SenderTypes),

    },
    isRead:{
      type: Boolean,
      default: false
    },
    receiverId:{
        type: String
    },
    senderName:{
      type: String
    },
    message :{
       type :String,
       required :true
    },
    messageType : {
       type :String,
       enum : Object.values(MessageTypes)

    },
    
   },
   {timestamps: true}
)

export const MessageModel = mongoose.model<IMessage>("Message", MessageSchema);