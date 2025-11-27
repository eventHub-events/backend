import { ReportEntity } from "../../entities/common/report/ReportEntity";
import { ReportTypes } from "../../enums/common/report";

export interface IReportRepository {
  createReport(data: ReportEntity): Promise<ReportEntity>;
  getReports(targetType: ReportTypes,page: number, limit: number): Promise<{reportEntity:ReportEntity[];total: number}>; 
  countReport():Promise<number>;
  updateReport(reportId: string, data: ReportEntity): Promise<ReportEntity | null> 
  findReportById(reportId: string): Promise<ReportEntity| null>;
  findReportsByTargetType(targetType: ReportTypes): Promise<ReportEntity[]>;
}