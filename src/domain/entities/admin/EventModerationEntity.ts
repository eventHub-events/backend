import { Types } from "mongoose";
import { EventApprovalStatus, EventStatus } from "../../enums/organizer/events";
import { EventEntity } from "../organizer/EventEntity";


export class EventModerationEntity {
  public eventId :  Types.ObjectId;
  public eventApprovalStatus: EventApprovalStatus;
  public approved : boolean;
  public approvedAt? : Date;
  public approvedBy? : string;
  public rejectionReason?: string;
  public flaggedReason? : string;
  public flaggedBy?: string;;
  public flaggedAt? : Date;
  public isBlocked? : boolean;
  public blockedAt?: Date;
  public blockedBy? : string;;
  public  id?: Types.ObjectId;
  public moderationHistory?:Array<{
    action : string;
    reason?: string;
    performedBy?: string;
    performedAt ?:Date
  }>

  constructor(props:{
    eventId: Types.ObjectId,
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
    id?: Types.ObjectId;
    moderationHistory?:Array<{
    action : string;
    reason?: string;
    performedBy?: string;
    performedAt? :Date
  }>
  }){
      this.eventId = props.eventId;
      this.eventApprovalStatus = props.eventApprovalStatus;
      this.approved = props.approved;
      this.approvedAt = props.approvedAt;
      this.approvedBy = props.approvedBy;
      this.rejectionReason = props.rejectionReason;
      this.flaggedReason = props.flaggedReason;
      this.flaggedAt = props.flaggedAt;
      this.flaggedBy = props.flaggedBy;
      this.isBlocked = props.isBlocked;
      this.blockedAt = props.blockedAt
      this.id = props.id;
      this.moderationHistory= props.moderationHistory
  }
   
blockEvent(reason:string= "", blockedBy:string= ""){
   this.isBlocked = true;
   this.eventApprovalStatus=EventApprovalStatus.Blocked
    this.blockedBy = blockedBy;
   this.blockedAt = new Date;
   this.addToHistory("Blocked", reason, blockedBy);

}
private addToHistory(action: string, reason: string| undefined, performedBy: string): void {
   if(!this.moderationHistory) this.moderationHistory = [];

   this.moderationHistory.push({
    action,
    reason,
    performedBy,
    performedAt : new Date()
   })
}
update(data:Partial<EventModerationEntity>){
    Object.assign(this, data);
   return this
}
unBlockEvent(unBlockedBy: string=""): void {
  this.eventApprovalStatus = EventApprovalStatus.Approved
  this.isBlocked = false;
  this.blockedBy = undefined;
  this.blockedAt = undefined;
  this.addToHistory ("unBlocked", undefined, unBlockedBy);
}
approveEvent(approvedBy: string): void {
  this.eventApprovalStatus = EventApprovalStatus.Approved;
  this.approved = true;
  this.approvedAt = new Date();
  this.approvedBy = approvedBy;
  
  this.addToHistory("APPROVED", undefined, approvedBy);
}
rejectEvent(rejectionReason: string, performedBy: string): void {
  this.eventApprovalStatus = EventApprovalStatus.Rejected;
  this.approved = false;
  this.rejectionReason = rejectionReason;
  
  this.addToHistory("REJECTED", rejectionReason, performedBy);
}
computeStatus(event: EventEntity) {
    // if(event.isDeleted) return EventStatus.Cancelled;
    //         if (!this.approved) return EventStatus.Draft;
            if(this.eventApprovalStatus === EventApprovalStatus.Flagged){
                return EventApprovalStatus.Flagged
            }
            if(this.eventApprovalStatus === EventApprovalStatus.Approved){
                 return EventApprovalStatus.Approved
            }
              
            if(this.eventApprovalStatus === EventApprovalStatus.Rejected){
              return EventApprovalStatus.Rejected
            }
            if(this.eventApprovalStatus === EventApprovalStatus.Blocked) return EventApprovalStatus.Blocked
        //      const now = new Date();

   
        // if (event.startDate > now) return EventStatus.Upcoming;
        // if (event.startDate <= now && event.endDate >= now) return EventStatus.Active;
        // if (event.endDate < now) return EventStatus.Completed;
   
       return EventApprovalStatus.Pending;
}



}