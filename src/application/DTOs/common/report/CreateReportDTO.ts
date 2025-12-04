import { ReportStatus, ReportTypes } from "../../../../domain/enums/common/report";

export interface CreateReportDTO {
 reporterId: string;
 reporterName: string;
 reporterRole?: string;
 targetId:  string;
 targetType: ReportTypes;
 reason: string;
 description?: string;
status?: ReportStatus,
chatId?: string;
senderId?: string;
senderName?:string;
  mode?:"private"|"community";
  messageSnapshot?: string
 
}