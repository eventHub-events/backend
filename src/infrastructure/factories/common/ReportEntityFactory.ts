import { IReportEntityFactory } from '../../../application/interface/factories/common/IReportEntityFactory';
import { ReportEntity } from '../../../domain/entities/common/report/ReportEntity';
import { ReportDbModel } from '../../../domain/types/CommonDbTypes';

export class ReportEntityFactory implements IReportEntityFactory {
  toDomain(dbModel: ReportDbModel): ReportEntity {
    return new ReportEntity({
      reporterId: dbModel.reporterId,
      reporterName: dbModel.reporterName,
      reporterRole: dbModel.reporterRole,
      targetId: dbModel.targetId,
      targetType: dbModel.targetType,
      reason: dbModel.reason,
      description: dbModel.description,
      status: dbModel.status,
      adminNote: dbModel.adminNote,
      createdAt: dbModel.createdAt,
      updatedAt: dbModel.updatedAt,
      id: dbModel._id.toString(),
      action: dbModel.action,
      chatId: dbModel.chatId,
      messageSnapshot: dbModel.messageSnapshot,
      senderName: dbModel.senderName,
      senderId: dbModel.senderId,
    });
  }
  toDomainList(dbModel: ReportDbModel[]): ReportEntity[] {
    return dbModel.map(m => this.toDomain(m));
  }
}
