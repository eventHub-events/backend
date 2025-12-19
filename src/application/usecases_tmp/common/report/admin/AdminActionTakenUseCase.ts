import { ErrorMessages } from '../../../../../constants/errorMessages';
import {
  ReportActions,
  ReportStatus,
  ReportTypes,
} from '../../../../../domain/enums/common/report';
import { NotFoundError } from '../../../../../domain/errors/common';
import { IReportRepository } from '../../../../../domain/repositories/common/IReportRepository';
import { IEventRepository } from '../../../../../domain/repositories/organizer/IEventsRepository';
import { IUserRepository } from '../../../../../domain/repositories/user/IUserRepository';
import { ResponseMessages } from '../../../../../infrastructure/constants/responseMessages';
import { IReportModerationEmailTemplate } from '../../../../../infrastructure/interface/Templates/IReportModerationEmailTemplate';
import { TargetPerson } from '../../../../../infrastructure/types/report/report';
import { AdminActionDTO } from '../../../../DTOs/common/report/AdminReportActionDTO';
import { IAdminActionTakenUseCase } from '../../../../interface/useCases/common/report/admin/IAdminActionTakenUseCase';
import { IEmailService } from '../../../../interface/useCases/user/IEmailService';

export class AdminActionTakenUseCase implements IAdminActionTakenUseCase {
  constructor(
    private _reportRepo: IReportRepository,
    private _eventRepo: IEventRepository,
    private _userRepo: IUserRepository,
    private _templateService: IReportModerationEmailTemplate,
    private _sentMail: IEmailService
  ) {}
  async execute(data: AdminActionDTO): Promise<string> {
    const report = await this._reportRepo.findReportById(data.reportId);
    if (!report) throw new NotFoundError(ErrorMessages.REPORT.NOT_FOUND);

    let targetEmail = '';
    let targetName = '';
    let role: TargetPerson;

    // FOR REPORTING USER //

    if (report.targetType === ReportTypes.USER) {
      const user = await this._userRepo.findUserById(report.targetId);
      if (!user) throw new NotFoundError(ErrorMessages.USER.NOT_FOUND);
      targetEmail = user.email;
      targetName = user.name;

      if (data.action === ReportActions.BLOCK) {
        user?.block();
        const isBlocked = user.isBlocked;
        await this._userRepo.updateUser(report.targetId, { isBlocked });
      }
    }

    // FOR REPORTING ORGANIZER //

    if (report.targetType === ReportTypes.ORGANIZER) {
      const organizer = await this._userRepo.findUserById(report.targetId);
      if (!organizer)
        throw new NotFoundError(ErrorMessages.ORGANIZER.NOT_FOUND);
      targetEmail = organizer.email;
      targetName = organizer.name;

      if (data.action === ReportActions.BLOCK) {
        organizer?.block();
        const blocked = organizer?.isBlocked;
        await this._userRepo.updateUser(report.targetId, {
          isBlocked: blocked,
        });
      }

      if (data.action === ReportActions.WARN) {
        const email = this._templateService.organizerWarningEmail({
          organizerName: targetName,
          adminNote: data.adminNote!,
        });

        await this._sentMail.sendMail(targetEmail, email.subject, email.html);
      }
    }

    // FOR REPORTING EVENT //

    if (report.targetType === ReportTypes.EVENT) {
      const event = await this._eventRepo.findEventById(report.targetId);
      if (!event) throw new NotFoundError(ErrorMessages.EVENT.NOT_FOUND);

      const organizer = await this._userRepo.findUserById(
        event.organizerId.toString()
      );
      if (!organizer)
        throw new NotFoundError(ErrorMessages.ORGANIZER.NOT_FOUND);
      targetEmail = organizer.email;
      targetName = organizer.name;

      if (data.action === ReportActions.BLOCK) {
        organizer?.block();
        const blocked = organizer?.isBlocked;
        await this._userRepo.updateUser(report.targetId, {
          isBlocked: blocked,
        });
      }

      if (data.action === ReportActions.WARN) {
        const email = this._templateService.organizerWarningEmail({
          organizerName: targetName,
          adminNote: data.adminNote!,
        });

        await this._sentMail.sendMail(targetEmail, email.subject, email.html);
      }
    }
    // FOR REPORTING CHAT_MESSAGE //
    if (report.targetType === ReportTypes.CHAT_MESSAGE) {
      const targetPerson = await this._userRepo.findUserById(report.senderId!);
      if (!targetPerson)
        throw new NotFoundError(ErrorMessages.REPORT.TARGET_PERSON_NOT_FOUND);

      role =
        targetPerson.role === TargetPerson.USER
          ? TargetPerson.USER
          : TargetPerson.ORGANIZER;
      targetEmail = targetPerson?.email;
      targetName = targetPerson.name;

      if (data.action === ReportActions.WARN) {
        const email = this._templateService.chatWarningEmail({
          name: targetName,
          role,
          adminNote: data.adminNote!,
        });

        await this._sentMail.sendMail(targetEmail, email.subject, email.html);
      }
      if (data.action === ReportActions.BLOCK) {
        targetPerson.block();
        const blocked = targetPerson.isBlocked;
        await this._userRepo.updateUser(report.senderId!, {
          isBlocked: blocked,
        });

        const email = this._templateService.chatBlockEmail({
          name: targetName,
          role,
          adminNote: data.adminNote!,
        });

        await this._sentMail.sendMail(targetEmail, email.subject, email.html);
      }
    }

    if (
      data.action === ReportActions.BLOCK &&
      report.targetType !== ReportTypes.CHAT_MESSAGE
    ) {
      const email = this._templateService.blockActionEmail({
        name: targetName,
        targetType: report.targetType,
        adminNote: data.adminNote!,
      });

      await this._sentMail.sendMail(targetEmail, email.subject, email.html);
    }

    report.update({
      status: ReportStatus.ACTION_TAKEN,
      action: data.action,
      adminNote: data.adminNote,
      updatedAt: new Date(),
    });

    await this._reportRepo.updateReport(data.reportId, report);
    return ResponseMessages.REPORT.REPORT_UPDATE_SUCCESS;
  }
}
