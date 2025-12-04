import mongoose, { Document, Schema } from "mongoose";
import { ReportActions, ReportStatus, ReportTypes } from "../../../../../domain/enums/common/report";


export interface IReport extends Document {
  reporterId: string;
  reporterName: string;
  reporterRole?: string;
  targetId: string;
  targetType: ReportTypes;
  reason: string;
  description?: string;
  status: ReportStatus;
  adminNote?: string;
  createdAt?:  Date;
  updatedAt?: Date;
  action?: ReportActions;
  chatId?:string;
  messageSnapshot?:string
  senderName?: string;
  senderId?: string;

}
const reportSchema = new Schema<IReport>({
   reporterId :{
      type: String,
      required: true
   },
   reporterName: {
    type: String
   },
   reporterRole: {
      type: String
   },
   messageSnapshot:{
    type: String
   },
   senderId :{
     type : String
   },
   targetId:{
     type: String
   },
   senderName : {
     type :String
   },
   action:{
     type: String,
     enum: Object.values(ReportActions)
   },
   targetType : {
     type: String,
     enum: Object.values(ReportTypes)
   },
   reason:{
     type: String,
     default:""
   },
   chatId: {
    type :String
   },
   description:{
     type: String,
     default:""
   },
   status:{
     type: String,
     enum: Object.values(ReportStatus),
     default: ReportStatus.PENDING
   },
   adminNote:{
    type: String
   }
},{timestamps : true});

export const ReportModel = mongoose.model<IReport>("Report", reportSchema);