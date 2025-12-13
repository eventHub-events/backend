import { EventModerationEntity } from '../entities/admin/EventModerationEntity';
import { EventEntity } from '../entities/organizer/EventEntity';
import { EventApprovalStatus, EventStatus } from '../enums/organizer/events';
import { IEventStatusCalculatorClass } from '../interface/services/IEventCalculatorClass';

export class EventStatusCalculator implements IEventStatusCalculatorClass {
  compute(event: EventEntity, moderation: EventModerationEntity): EventStatus {
    if (event.isDeleted) return EventStatus.Cancelled;
    if (!moderation.approved) return EventStatus.Draft;
    if (moderation.eventApprovalStatus === EventApprovalStatus.Flagged) {
      return EventStatus.Flagged;
    }
    if (moderation.eventApprovalStatus === EventApprovalStatus.Approved) {
      return EventStatus.Upcoming;
    }

    if (moderation.eventApprovalStatus === EventApprovalStatus.Rejected) {
      return EventStatus.Cancelled;
    }
    if (moderation.eventApprovalStatus === EventApprovalStatus.Blocked)
      return EventStatus.Blocked;
    const now = new Date();

    if (event.startDate > now) return EventStatus.Upcoming;
    if (event.startDate <= now && event.endDate >= now)
      return EventStatus.Active;
    if (event.endDate < now) return EventStatus.Completed;

    return EventStatus.Draft;
  }
}
