import {
  ReportActions,
  ReportStatus,
} from '../../../../domain/enums/common/report';

export interface AdminActionDTO {
  reportId: string;
  status: ReportStatus;
  adminNote?: string;
  action: ReportActions;
  adminId?: string;
  targetId?: string;
}
