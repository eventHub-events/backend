import { ReportTypes } from '../../../domain/enums/common/report';

export interface IReportModerationEmailTemplate {
  organizerWarningEmail(params: { organizerName: string; adminNote: string }): {
    subject: string;
    html: string;
  };
  blockActionEmail(params: {
    name: string;
    targetType: ReportTypes;
    adminNote: string;
  }): { subject: string; html: string };
  chatWarningEmail(params: {
    name: string;
    role: 'user' | 'organizer';
    adminNote: string;
  }): { subject: string; html: string };
  chatBlockEmail(params: {
    name: string;
    role: 'user' | 'organizer';
    adminNote: string;
  }): { subject: string; html: string };
}
