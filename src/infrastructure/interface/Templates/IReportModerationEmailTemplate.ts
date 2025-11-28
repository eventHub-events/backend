import { ReportTypes } from "../../../domain/enums/common/report";

export interface IReportModerationEmailTemplate {
    organizerWarningEmail(params: { organizerName: string; adminNote: string; }): {subject:string, html:string};
    blockActionEmail(params: { name: string; targetType: ReportTypes; adminNote: string; }): {subject:string, html:string};
}