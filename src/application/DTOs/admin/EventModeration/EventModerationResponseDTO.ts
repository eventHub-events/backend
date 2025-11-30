import { EventApprovalStatus } from "../../../../domain/enums/organizer/events";

export interface EventModerationResponseDTO {
      eventId: string,
      eventApprovalStatus: EventApprovalStatus,
      approved: boolean
      approvedAt? : Date;
      approvedBy? : string;
      rejectionReason?: string;
      flaggedReason? : string;
      flaggedBy?: string;
      flaggedAt? : Date;
      isBlocked? : boolean;
      blockedAt?: Date;
      blockedBy? : string;
      id?: string;
      moderationHistory?:Array<{
      action : string;
      reason?: string;
      performedBy: string;
      performedAt :Date
    }>
}