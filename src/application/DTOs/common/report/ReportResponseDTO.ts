import {
  ReportActions,
  ReportStatus,
  ReportTypes,
} from '../../../../domain/enums/common/report';

export interface ReportResponseDTO {
  reporterId: string;
  reporterName: string;
  reporterRole?: string;
  targetId: string;
  targetType: ReportTypes;
  reason: string;
  description?: string;
  status: ReportStatus;
  adminNote?: string;
  reported?: Date;
  updatedAt?: Date;
  id?: string;
  action?: ReportActions;
  chatId?: string;
  messageSnapshot?: string;
  senderName?: string;
  senderId?: string;
}
