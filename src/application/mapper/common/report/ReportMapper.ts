import { ReportEntity } from '../../../../domain/entities/common/report/ReportEntity';
import { ReportStatus } from '../../../../domain/enums/common/report';
import { CreateReportDTO } from '../../../DTOs/common/report/CreateReportDTO';
import { ReportResponseDTO } from '../../../DTOs/common/report/ReportResponseDTO';
import { IReportMapper } from '../../../interface/mapper/common/report/IReportMapper';

export class ReportMapper implements IReportMapper {
  toEntity(dto: CreateReportDTO): ReportEntity {
    return new ReportEntity({
      reporterId: dto.reporterId,
      reporterName: dto.reporterName,
      reporterRole: dto.reporterRole,
      targetId: dto.targetId,
      targetType: dto.targetType,
      reason: dto.reason,
      description: dto.description,
      status: dto.status ?? ReportStatus.PENDING,
      chatId: dto.chatId,
      messageSnapshot: dto.messageSnapshot,
      senderName: dto.senderName,
      senderId: dto.senderId,
    });
  }
  toResponseDTO(entity: ReportEntity): ReportResponseDTO {
    return {
      id: entity.id,
      reporterId: entity.reporterId,
      reporterName: entity.reporterName,
      reporterRole: entity.reporterRole,
      targetId: entity.targetId,
      targetType: entity.targetType,
      reason: entity.reason,
      description: entity.description,
      status: entity.status,
      action: entity.action,
      reported: entity.createdAt,
      chatId: entity.chatId,
      senderName: entity.senderName,
      messageSnapshot: entity.messageSnapshot,
      senderId: entity.senderId,
    };
  }
  toResponseDTOList(entity: ReportEntity[]): ReportResponseDTO[] {
    return entity.map(e => this.toResponseDTO(e));
  }
}
