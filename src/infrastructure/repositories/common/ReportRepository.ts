import { IReportEntityFactory } from "../../../application/interface/factories/common/IReportEntityFactory";
import { ReportEntity } from "../../../domain/entities/common/report/ReportEntity";
import { ReportTypes } from "../../../domain/enums/common/report";
import { IReportRepository } from "../../../domain/repositories/common/IReportRepository";
import { ReportDbModel } from "../../../domain/types/CommonDbTypes";
import { IReport, ReportModel } from "../../db/models/common/Report/ReportModel";
import { BaseRepository } from "../BaseRepository";

export class ReportRepository extends BaseRepository<IReport> implements IReportRepository {
   constructor(
        private _reportEntityFactory : IReportEntityFactory
   ){
     super(ReportModel)
   }

  async createReport(data: ReportEntity): Promise<ReportEntity> {

      const report = await super.create(data) as ReportDbModel;
    return this._reportEntityFactory.toDomain(report);

  }
  async countReport(): Promise<number> {
      const count = await ReportModel.countDocuments();
    return count;
  }
 async updateReport(reportId: string, data: ReportEntity): Promise<ReportEntity | null> {

       const updated = await super.update(reportId,data) as ReportDbModel;
    return updated? this._reportEntityFactory.toDomain(updated): null;

 }
 async findReportById(reportId: string): Promise<ReportEntity | null> {

     const report = await super.findById(reportId) as ReportDbModel;
  return report ? this._reportEntityFactory.toDomain(report): null;
    
 }
 async findReportsByTargetType(targetType: ReportTypes): Promise<ReportEntity[]> {

     const reports = await super.findAll({targetType}) as ReportDbModel[];
  return this._reportEntityFactory.toDomainList(reports);
    

     
 }
 async getReports(targetType: ReportTypes, page: number, limit: number): Promise<{reportEntity:ReportEntity[];total: number}> {
        const filter = {targetType}
     const {data,total} = await super.paginate(filter,page,limit) as{data:ReportDbModel[];total: number};
     const reportEntity = this._reportEntityFactory.toDomainList(data);

    return {reportEntity,total}

 }
}