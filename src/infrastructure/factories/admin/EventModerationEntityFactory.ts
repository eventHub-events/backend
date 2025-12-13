import { IEventModerationEntityFactory } from '../../../application/interface/factories/admin/IEventModerationEntityFactory';
import { EventModerationEntity } from '../../../domain/entities/admin/EventModerationEntity';
import { EventModerationDbModel } from '../../../domain/types/AdminDbTypes';

export class EventModerationEntityFactory implements IEventModerationEntityFactory<
  EventModerationDbModel,
  EventModerationEntity
> {
  toDomain(dbModel: EventModerationDbModel): EventModerationEntity {
    return new EventModerationEntity({
      eventId: dbModel.eventId,
      eventApprovalStatus: dbModel.eventApprovalStatus,
      approved: dbModel.approved,
      approvedAt: dbModel.approvedAt,
      approvedBy: dbModel.approvedBy,
      rejectionReason: dbModel.rejectionReason,
      flaggedReason: dbModel.flaggedReason,
      flaggedAt: dbModel.flaggedAt,
      flaggedBy: dbModel.flaggedBy,
      id: dbModel._id,
      isBlocked: dbModel.isBlocked,
      blockedAt: dbModel.blockedAt,
      blockedBy: dbModel.blockedBy,
      moderationHistory: dbModel.moderationHistory,
    });
  }
  toDomainList(dbModels: EventModerationDbModel[]): EventModerationEntity[] {
    return dbModels.map(model => this.toDomain(model));
  }
}
