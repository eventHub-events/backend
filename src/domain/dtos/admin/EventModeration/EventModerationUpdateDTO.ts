import { EventApprovalStatus } from "../../../enums/organizer/events";

export interface EventModerationUpdateDTO {
        eventId: string,
        eventApprovalStatus: EventApprovalStatus,
        approved: boolean
        approvedAt : Date;
        approvedBy? : string;
        rejectionReason?: string;
        flaggedReason? : string;
        flaggedBy?: string;
        flaggedAt? : Date;
        isBlocked? : boolean;
        blockedAt?: Date;
        blockedBy? : string;
        moderationHistory?:Array<{
        action : string;
        reason?: string;
        performedBy?: string;
        performedAt? :Date
      }>
}